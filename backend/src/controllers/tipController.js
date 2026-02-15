const { PrismaClient } = require('@prisma/client');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const prisma = new PrismaClient();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay order for tip
exports.createTipOrder = async (req, res) => {
  try {
    const { cleanTipId, amount } = req.body;
    const userId = req.user.id;

    // Validate amount
    if (!amount || amount < 1) {
      return res.status(400).json({ error: 'Amount must be at least ₹1' });
    }

    // Get CleanTip
    const cleanTip = await prisma.cleanTip.findUnique({
      where: { id: cleanTipId },
      include: { creator: true }
    });

    if (!cleanTip) {
      return res.status(404).json({ error: 'CleanTip not found' });
    }

    if (cleanTip.status !== 'APPROVED') {
      return res.status(400).json({ error: 'Cannot tip unapproved CleanTip' });
    }

    // Prevent self-tipping
    if (cleanTip.creatorId === userId) {
      return res.status(400).json({ error: 'You cannot tip your own CleanTip' });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `tip_${cleanTipId}_${Date.now()}`,
      notes: {
        cleanTipId,
        senderId: userId,
        recipientId: cleanTip.creatorId,
        type: 'cleantip_tip'
      }
    });

    // Create pending tip transaction
    const tip = await prisma.tip.create({
      data: {
        cleanTipId,
        senderId: userId,
        recipientId: cleanTip.creatorId,
        amount,
        orderId: order.id,
        status: 'PENDING'
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatarUrl: true
          }
        },
        recipient: {
          select: {
            id: true,
            name: true,
            avatarUrl: true
          }
        }
      }
    });

    res.json({
      tip,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency
      }
    });
  } catch (error) {
    console.error('Error creating tip order:', error);
    res.status(500).json({ error: 'Failed to create tip order' });
  }
};

// Verify tip payment
exports.verifyTipPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // Find tip by order ID
    const tip = await prisma.tip.findFirst({
      where: { orderId: razorpay_order_id },
      include: {
        cleanTip: true,
        sender: true,
        recipient: true
      }
    });

    if (!tip) {
      return res.status(404).json({ error: 'Tip not found' });
    }

    // Update tip status
    const updatedTip = await prisma.$transaction(async (tx) => {
      // Update tip
      const updated = await tx.tip.update({
        where: { id: tip.id },
        data: {
          paymentId: razorpay_payment_id,
          status: 'COMPLETED'
        }
      });

      // Update CleanTip totals
      const isFirstTipFromSender = await tx.tip.count({
        where: {
          cleanTipId: tip.cleanTipId,
          senderId: tip.senderId,
          status: 'COMPLETED',
          id: { not: tip.id }
        }
      }) === 0;

      await tx.cleanTip.update({
        where: { id: tip.cleanTipId },
        data: {
          totalTips: { increment: tip.amount },
          ...(isFirstTipFromSender && { tipperCount: { increment: 1 } })
        }
      });

      return updated;
    });

    // Create notifications
    await prisma.notification.create({
      data: {
        userId: tip.recipientId,
        type: 'TIP_RECEIVED',
        title: 'You received a tip!',
        message: `${tip.sender.name} sent you ₹${tip.amount} for your CleanTip "${tip.cleanTip.title}"`,
        data: {
          tipId: tip.id,
          cleanTipId: tip.cleanTipId,
          amount: tip.amount,
          senderId: tip.senderId
        }
      }
    });

    res.json({
      success: true,
      tip: updatedTip
    });
  } catch (error) {
    console.error('Error verifying tip payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
};

// Get tips for a specific CleanTip
exports.getCleanTipTips = async (req, res) => {
  try {
    const { cleanTipId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [tips, total] = await Promise.all([
      prisma.tip.findMany({
        where: {
          cleanTipId,
          status: 'COMPLETED'
        },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              avatarUrl: true
            }
          }
        }
      }),
      prisma.tip.count({
        where: {
          cleanTipId,
          status: 'COMPLETED'
        }
      })
    ]);

    res.json({
      tips,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching tips:', error);
    res.status(500).json({ error: 'Failed to fetch tips' });
  }
};

// Get tips sent by current user
exports.getMySentTips = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [tips, total, totalAmount] = await Promise.all([
      prisma.tip.findMany({
        where: {
          senderId: userId,
          status: 'COMPLETED'
        },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          cleanTip: {
            select: {
              id: true,
              title: true,
              beforePhoto: true,
              afterPhoto: true
            }
          },
          recipient: {
            select: {
              id: true,
              name: true,
              avatarUrl: true
            }
          }
        }
      }),
      prisma.tip.count({
        where: {
          senderId: userId,
          status: 'COMPLETED'
        }
      }),
      prisma.tip.aggregate({
        where: {
          senderId: userId,
          status: 'COMPLETED'
        },
        _sum: {
          amount: true
        }
      })
    ]);

    res.json({
      tips,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      },
      stats: {
        totalTipsSent: total,
        totalAmountSent: totalAmount._sum.amount || 0
      }
    });
  } catch (error) {
    console.error('Error fetching sent tips:', error);
    res.status(500).json({ error: 'Failed to fetch sent tips' });
  }
};

// Get tips received by current user
exports.getMyReceivedTips = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [tips, total, totalAmount] = await Promise.all([
      prisma.tip.findMany({
        where: {
          recipientId: userId,
          status: 'COMPLETED'
        },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          cleanTip: {
            select: {
              id: true,
              title: true,
              beforePhoto: true,
              afterPhoto: true
            }
          },
          sender: {
            select: {
              id: true,
              name: true,
              avatarUrl: true
            }
          }
        }
      }),
      prisma.tip.count({
        where: {
          recipientId: userId,
          status: 'COMPLETED'
        }
      }),
      prisma.tip.aggregate({
        where: {
          recipientId: userId,
          status: 'COMPLETED'
        },
        _sum: {
          amount: true
        }
      })
    ]);

    res.json({
      tips,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      },
      stats: {
        totalTipsReceived: total,
        totalAmountReceived: totalAmount._sum.amount || 0
      }
    });
  } catch (error) {
    console.error('Error fetching received tips:', error);
    res.status(500).json({ error: 'Failed to fetch received tips' });
  }
};

// Get tip statistics for current user
exports.getMyTipStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const [sentStats, receivedStats, topCleanTips] = await Promise.all([
      // Tips sent
      prisma.tip.aggregate({
        where: {
          senderId: userId,
          status: 'COMPLETED'
        },
        _sum: { amount: true },
        _count: true
      }),
      // Tips received
      prisma.tip.aggregate({
        where: {
          recipientId: userId,
          status: 'COMPLETED'
        },
        _sum: { amount: true },
        _count: true
      }),
      // Top earning CleanTips
      prisma.cleanTip.findMany({
        where: {
          creatorId: userId,
          status: 'APPROVED'
        },
        orderBy: { totalTips: 'desc' },
        take: 5,
        select: {
          id: true,
          title: true,
          totalTips: true,
          tipperCount: true,
          beforePhoto: true,
          afterPhoto: true
        }
      })
    ]);

    res.json({
      sent: {
        totalAmount: sentStats._sum.amount || 0,
        totalTips: sentStats._count || 0
      },
      received: {
        totalAmount: receivedStats._sum.amount || 0,
        totalTips: receivedStats._count || 0
      },
      topCleanTips
    });
  } catch (error) {
    console.error('Error fetching tip stats:', error);
    res.status(500).json({ error: 'Failed to fetch tip statistics' });
  }
};

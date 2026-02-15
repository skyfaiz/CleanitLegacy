const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new CleanTip
exports.createCleanTip = async (req, res) => {
  try {
    const { title, description, location, beforePhoto, afterPhoto } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!title || !description || !location || !beforePhoto || !afterPhoto) {
      return res.status(400).json({ 
        error: 'All fields are required: title, description, location, beforePhoto, afterPhoto' 
      });
    }

    // Create CleanTip
    const cleanTip = await prisma.cleanTip.create({
      data: {
        title,
        description,
        location,
        beforePhoto,
        afterPhoto,
        creatorId: userId,
        status: 'PENDING' // Requires admin approval
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true
          }
        }
      }
    });

    // Create notification for admins
    const admins = await prisma.user.findMany({
      where: { role: 'ADMIN' }
    });

    for (const admin of admins) {
      await prisma.notification.create({
        data: {
          userId: admin.id,
          type: 'CLEANTIP_PENDING',
          title: 'New CleanTip Pending Approval',
          message: `${cleanTip.creator.name} created a new CleanTip: "${title}"`,
          data: { cleanTipId: cleanTip.id }
        }
      });
    }

    res.status(201).json(cleanTip);
  } catch (error) {
    console.error('Error creating CleanTip:', error);
    res.status(500).json({ error: 'Failed to create CleanTip' });
  }
};

// Get all CleanTips (with filters and pagination)
exports.getAllCleanTips = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    
    // Only show approved CleanTips to regular users
    if (req.user?.role !== 'ADMIN') {
      where.status = 'APPROVED';
    } else if (status) {
      where.status = status.toUpperCase();
    }

    const [cleanTips, total] = await Promise.all([
      prisma.cleanTip.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { [sortBy]: order },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              avatarUrl: true
            }
          },
          _count: {
            select: { tips: true }
          }
        }
      }),
      prisma.cleanTip.count({ where })
    ]);

    res.json({
      cleanTips,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching CleanTips:', error);
    res.status(500).json({ error: 'Failed to fetch CleanTips' });
  }
};

// Get single CleanTip by ID
exports.getCleanTipById = async (req, res) => {
  try {
    const { id } = req.params;

    const cleanTip = await prisma.cleanTip.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true
          }
        },
        tips: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                avatarUrl: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10 // Latest 10 tips
        }
      }
    });

    if (!cleanTip) {
      return res.status(404).json({ error: 'CleanTip not found' });
    }

    // Only allow viewing approved CleanTips unless admin or creator
    if (cleanTip.status !== 'APPROVED' && 
        req.user?.role !== 'ADMIN' && 
        req.user?.id !== cleanTip.creatorId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(cleanTip);
  } catch (error) {
    console.error('Error fetching CleanTip:', error);
    res.status(500).json({ error: 'Failed to fetch CleanTip' });
  }
};

// Get current user's CleanTips
exports.getMyCleanTips = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [cleanTips, total] = await Promise.all([
      prisma.cleanTip.findMany({
        where: { creatorId: userId },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { tips: true }
          }
        }
      }),
      prisma.cleanTip.count({ where: { creatorId: userId } })
    ]);

    res.json({
      cleanTips,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching user CleanTips:', error);
    res.status(500).json({ error: 'Failed to fetch CleanTips' });
  }
};

// Update CleanTip (owner only)
exports.updateCleanTip = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location } = req.body;
    const userId = req.user.id;

    const cleanTip = await prisma.cleanTip.findUnique({
      where: { id }
    });

    if (!cleanTip) {
      return res.status(404).json({ error: 'CleanTip not found' });
    }

    if (cleanTip.creatorId !== userId) {
      return res.status(403).json({ error: 'You can only update your own CleanTips' });
    }

    const updatedCleanTip = await prisma.cleanTip.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(location && { location })
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            avatarUrl: true
          }
        }
      }
    });

    res.json(updatedCleanTip);
  } catch (error) {
    console.error('Error updating CleanTip:', error);
    res.status(500).json({ error: 'Failed to update CleanTip' });
  }
};

// Delete CleanTip (owner or admin)
exports.deleteCleanTip = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const cleanTip = await prisma.cleanTip.findUnique({
      where: { id }
    });

    if (!cleanTip) {
      return res.status(404).json({ error: 'CleanTip not found' });
    }

    if (cleanTip.creatorId !== userId && userRole !== 'ADMIN') {
      return res.status(403).json({ error: 'Access denied' });
    }

    await prisma.cleanTip.delete({
      where: { id }
    });

    res.json({ message: 'CleanTip deleted successfully' });
  } catch (error) {
    console.error('Error deleting CleanTip:', error);
    res.status(500).json({ error: 'Failed to delete CleanTip' });
  }
};

// Admin: Update CleanTip status
exports.updateCleanTipStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be APPROVED or REJECTED' });
    }

    const cleanTip = await prisma.cleanTip.findUnique({
      where: { id },
      include: {
        creator: true
      }
    });

    if (!cleanTip) {
      return res.status(404).json({ error: 'CleanTip not found' });
    }

    const updatedCleanTip = await prisma.cleanTip.update({
      where: { id },
      data: { status }
    });

    // Notify creator
    await prisma.notification.create({
      data: {
        userId: cleanTip.creatorId,
        type: `CLEANTIP_${status}`,
        title: `CleanTip ${status === 'APPROVED' ? 'Approved' : 'Rejected'}`,
        message: status === 'APPROVED' 
          ? `Your CleanTip "${cleanTip.title}" has been approved!`
          : `Your CleanTip "${cleanTip.title}" was rejected. ${reason || ''}`,
        data: { cleanTipId: id, reason }
      }
    });

    res.json(updatedCleanTip);
  } catch (error) {
    console.error('Error updating CleanTip status:', error);
    res.status(500).json({ error: 'Failed to update CleanTip status' });
  }
};

// Admin: Get all CleanTips for moderation
exports.getAllCleanTipsForAdmin = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = status ? { status: status.toUpperCase() } : {};

    const [cleanTips, total, stats] = await Promise.all([
      prisma.cleanTip.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
              avatarUrl: true
            }
          },
          _count: {
            select: { tips: true }
          }
        }
      }),
      prisma.cleanTip.count({ where }),
      prisma.cleanTip.groupBy({
        by: ['status'],
        _count: true
      })
    ]);

    res.json({
      cleanTips,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      },
      stats: stats.reduce((acc, item) => {
        acc[item.status.toLowerCase()] = item._count;
        return acc;
      }, {})
    });
  } catch (error) {
    console.error('Error fetching CleanTips for admin:', error);
    res.status(500).json({ error: 'Failed to fetch CleanTips' });
  }
};

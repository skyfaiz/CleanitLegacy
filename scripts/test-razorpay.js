require('dotenv').config({ path: './backend/.env' });
const Razorpay = require('razorpay');

console.log('Testing Razorpay configuration...');
console.log('Key ID:', process.env.RAZORPAY_KEY_ID);
console.log('Key Secret:', process.env.RAZORPAY_KEY_SECRET ? '***set***' : 'NOT SET');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

async function testOrder() {
    try {
        const order = await razorpay.orders.create({
            amount: 1000, // 10 rupees in paise
            currency: 'INR',
            receipt: 'test_receipt_123'
        });
        console.log('✅ Razorpay working! Order created:', order.id);
    } catch (error) {
        console.error('❌ Razorpay error:', error);
        if (error.statusCode === 401) {
            console.error('-> Invalid credentials! Check your RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET');
        }
    }
}

testOrder();

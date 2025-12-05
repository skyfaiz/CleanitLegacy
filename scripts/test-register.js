const axios = require('axios');

async function testRegister() {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
            email: 'test@example.com',
            password: 'password123',
            name: 'Test User',
            phone: '+91 9876543210',
            role: 'CITIZEN'
        });
        console.log('✅ Registration successful!');
        console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('❌ Registration failed');
        console.error('Status:', error.response?.status);
        console.error('Error:', error.response?.data || error.message);
    }
}

testRegister();

require('dotenv').config({ path: 'backend/.env' });
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'ap-south-1'
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'cleanit-uploads';

async function testS3() {
    console.log('Testing S3 Connection...');
    console.log(`Bucket: ${BUCKET_NAME}`);
    console.log(`Region: ${process.env.AWS_REGION}`);
    console.log(`Access Key: ${process.env.AWS_ACCESS_KEY_ID ? 'Set' : 'Missing'}`);

    try {
        await s3.listObjectsV2({ Bucket: BUCKET_NAME, MaxKeys: 1 }).promise();
        console.log('✅ Success! Credentials are valid and bucket is accessible.');
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.code === 'InvalidAccessKeyId') {
            console.error('-> Check your AWS_ACCESS_KEY_ID');
        } else if (error.code === 'SignatureDoesNotMatch') {
            console.error('-> Check your AWS_SECRET_ACCESS_KEY');
        } else if (error.code === 'NoSuchBucket') {
            console.error(`-> Bucket "${BUCKET_NAME}" does not exist`);
        }
    }
}

testS3();

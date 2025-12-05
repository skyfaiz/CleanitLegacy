const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'ap-south-1'
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'cleanit-uploads';

exports.uploadToS3 = async (file) => {
    try {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;
        const filePath = `uploads/${Date.now()}-${fileName}`;

        const params = {
            Bucket: BUCKET_NAME,
            Key: filePath,
            Body: file.buffer,
            ContentType: file.mimetype,
            ServerSideEncryption: 'AES256' // Encrypt data at rest
            // ACL: 'public-read' REMOVED for security
        };

        const result = await s3.upload(params).promise();
        return result.Key; // Return Key instead of Location (URL)
    } catch (error) {
        throw new Error(`File upload failed: ${error.message}`);
    }
};

exports.deleteFromS3 = async (fileKey) => {
    try {
        // Handle if full URL was passed (legacy)
        const key = fileKey.startsWith('http') ? fileKey.split('.com/')[1] : fileKey;

        const params = {
            Bucket: BUCKET_NAME,
            Key: key
        };

        await s3.deleteObject(params).promise();
        return true;
    } catch (error) {
        throw new Error(`File deletion failed: ${error.message}`);
    }
};

exports.generatePresignedUrl = async (key) => {
    if (!key) return null;

    // Check if it's already a full URL (legacy support)
    if (key.startsWith('http')) return key;

    // Check for CloudFront
    if (process.env.CLOUDFRONT_DOMAIN) {
        return `${process.env.CLOUDFRONT_DOMAIN}/${key}`;
    }

    try {
        const params = {
            Bucket: BUCKET_NAME,
            Key: key,
            Expires: parseInt(process.env.PRESIGNED_URL_EXPIRY) || 3600
        };

        return await s3.getSignedUrlPromise('getObject', params);
    } catch (error) {
        console.error('Error generating presigned URL:', error);
        return key; // Fallback
    }
};

const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();


const uploadImage = async (req, res) => {
    try {
        const file = req.file;
        const bucketName = process.env.BUCKET_NAME;
        const newFileNameKey = `images/${file.originalname}`;

        const fileStream = fs.createReadStream(file.path);

        const params = {
            Bucket: bucketName,
            Key: newFileNameKey,
            Body: fileStream
        };

        const data = await s3.upload(params).promise();
        console.log('Success', data.Location);

        res.json({ imageUrl: data.Location });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    uploadImage
};
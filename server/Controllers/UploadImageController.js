// const fs = require('fs');
// const AWS = require('aws-sdk');
// const multer = require('multer');
// const s3 = new AWS.S3();


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });


// const uploadImage = async (req, res) => {
//     try {
//         const file = req.file;
//         const bucketName = process.env.BUCKET_NAME;
//         const newFileNameKey = `images/${file.filename}`;

//         const fileStream = fs.createReadStream(file.path);

//         const params = {
//             Bucket: bucketName,
//             Key: newFileNameKey,
//             Body: fileStream
//         };

//         const data = await s3.upload(params).promise();
//         console.log('Success', data.Location);

//         // Delete the file from local storage after uploading to S3
//         fs.unlinkSync(file.path);

//         res.json({ imageUrl: data.Location });
//     } catch (error) {
//         console.error('Error uploading image:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };


// module.exports = {
//     uploadImage
// };
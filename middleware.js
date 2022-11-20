const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
require("dotenv").config();

// Setup image upload

const storage = multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: (req, file, callback) => {
        uidSafe(24).then((uid) => {
            const extension = path.extname(file.originalname);
            const newFileName = uid + extension;
            callback(null, newFileName);
        });
    },
});

module.exports.uploader = multer({
    storage,
    limits: {
        fileSize: 2097152,
    },
});

// Setup S3

// const aws = require("aws-sdk");

// const s3 = new aws.S3({
//     accessKeyId: process.env.AWS_KEY,
//     secretAccessKey: process.env.AWS_SECRET,
// });

// module.exports.promise = s3
//     .putObject({
//         Bucket: "spicedling",
//         ACL: "public-read",
//         Key: filename,
//         Body: fs.createReadStream(path),
//         ContentType: mimetype,
//         ContentLength: size,
//     })
//     .promise();

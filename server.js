const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 8080 } = process.env;
const { uploader } = require("./middleware");
const fs = require("fs");

// Setup database

const {
    addComment,
    getPrevImages,
    getImages,
    addImages,
    getCommentsByImageId,
    getNextImages,
} = require("./db");

// Setup S3

const aws = require("aws-sdk");

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
});

// Middleware

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());

// log routs

app.use((req, res, next) => {
    console.log("---------------------");
    console.log("req.url:", req.url);
    console.log("req.method:", req.method);
    console.log("req.session:", req.session);
    console.log("---------------------");
    next();
});

// Routs

// Get images for one results page, send them as json --------------------------- get/post images
app.get("/images", (req, res) => {
    getImages().then((result) => {
        res.json(result.rows); // this to send json to fetch
    });
});

// posting image
app.post("/images", uploader.single("image"), (req, res) => {
    const { filename, mimetype, size, path } = req.file;

    const promise = s3 // this to send to aws, different for other cloud storage
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            addImages({
                url: `https://s3.amazonaws.com/spicedling/${req.file.filename}`,
                username: req.body.username,
                title: req.body.title,
                description: req.body.description,
            });
            res.send("Upload OK");
        })
        .catch((err) => {
            console.log(err);
        });
});

// Get images for nex/prev results page ----------------------------------------- get more images
app.get("/prev/:firstImageID", (req, res) => {
    let firstID = req.params.firstImageID;
    console.log(firstID);
    getPrevImages(firstID).then((result) => {
        res.json(result.rows);
    });
});

app.get("/next/:lastImageID", (req, res) => {
    let lastID = req.params.lastImageID;
    getNextImages(lastID).then((result) => {
        res.json(result.rows);
    });
});

// get comments for one specific image ------------------------------------------ get/post comments
app.get("/images/:image_id", (req, res) => {
    getCommentsByImageId(req.params.image_id).then((result) => {
        console.log(result);
        res.json(result.rows); // this to send json to fetch
    });
});

app.post("/comments", (req, res) => {
    let comment = req.body;
    addComment(comment).then((result) => {
        console.log(result);
        res.json(result.rows[0]); // this to send json (actual new entry only) to fetch
    });
});

// get index.html --------------------------------------------------------------- initial request to home and sending index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));

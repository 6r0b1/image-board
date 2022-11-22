// ++++++++++++++ Setup modules

const spicedPg = require("spiced-pg");
require("dotenv").config();

const { DB_USER, DB_PASS, DB_DATABASE } = process.env;
const db = spicedPg(
    `postgres:${DB_USER}:${DB_PASS}@localhost:5432/${DB_DATABASE}`
    // `${DATABASE_URL}`
);

//  ++++++++++++++ END setup modules

function getImages() {
    return db.query(`SELECT * FROM images ORDER BY id DESC LIMIT 6`);
    // .then((result) => console.log(result[0].id));
}

function getPrevImages(firstImageID) {
    return db.query(
        `SELECT * FROM images WHERE id > $1 ORDER BY id DESC LIMIT 6`,
        [firstImageID]
    );
}

function getNextImages(lastImageID) {
    return db.query(
        `SELECT * FROM images WHERE id < $1 ORDER BY id DESC LIMIT 6`,
        [lastImageID]
    );
}

function addImages({ url, username, title, description, created_at }) {
    return db.query(
        `INSERT INTO images (url, username, title, description, created_at) VALUES ($1, $2, $3, $4, $5) 
        RETURNING *`,
        [url, username, title, description, created_at]
    );
}

function getCommentsByImageId(image_id) {
    return db.query(
        `SELECT * FROM comments WHERE image_id=$1 ORDER BY id DESC`,
        [image_id]
    );
}

function addComment({ image_id, commenter, comment }) {
    return db.query(
        `INSERT INTO comments (image_id, commenter, comment) VALUES ($1, $2, $3) 
        RETURNING *`,
        [image_id, commenter, comment]
    );
}

module.exports = {
    addComment,
    getPrevImages,
    getNextImages,
    addImages,
    getImages,
    getCommentsByImageId,
};

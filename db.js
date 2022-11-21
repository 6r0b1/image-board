// ++++++++++++++ Setup modules

const spicedPg = require("spiced-pg");
require("dotenv").config();

const { DB_USER, DB_PASS, DB_DATABASE } = process.env;
const db = spicedPg(
    `postgres:${DB_USER}:${DB_PASS}@localhost:5432/${DB_DATABASE}`
    // `${DATABASE_URL}`
);

//  ++++++++++++++ END setup modules

// Write entry
// Signing a petition
function getImages() {
    return db.query(`SELECT * FROM images`);
    // .then((result) => console.log(result[0].id));
}

function addImages({ url, username, title, description }) {
    return db.query(
        `INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4) 
        RETURNING *`,
        [url, username, title, description]
    );
}

module.exports = {
    addImages,
    getImages,
};

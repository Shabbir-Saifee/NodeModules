const url = require('url')
const username = encodeURIComponent("ebashra_db_admin");
const password = encodeURIComponent("Un!v3rs@l");
const cluster = "cluster0.ojugl";
const dbName = "ebashra_tuturials_db";
const uri = process.env.MONGODB_URI || `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

module.exports = {
    url: uri
};
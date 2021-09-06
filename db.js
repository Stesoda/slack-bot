const mongoose = require('mongoose');
require('dotenv').config();

class Database {

    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect(process.env.DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
                console.log("Database Connected")
        }).catch((err) => {
                console.log("Database Connection error" + err)
        });

    }
};

module.exports = new Database();
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB Connected!');
    } catch (error) {
        console.error(error.message);
        process.exit(1); //exit process in case of failure
    }
}

module.exports = connectDB;
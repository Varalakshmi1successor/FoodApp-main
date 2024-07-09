const mongoose = require("mongoose");
require('dotenv').config();

module.exports = () => {
    try {
        mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to database successfully");
    } catch (error) {
        console.error("Error connecting to database:", error.message);
    }
};

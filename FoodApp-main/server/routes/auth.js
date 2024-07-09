const express = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const router = express.Router();

// Middleware function for authentication
const auth = async (req, res, next) => {
    try {
        // Authentication logic here
        next();
    } catch (error) {
        res.status(401).send({ error: "Authentication failed" });
    }
};

// Middleware function for checking if the user is authenticated
const isUser = async (req, res, next) => {
    try {
        // User authentication logic here
        next();
    } catch (error) {
        res.status(401).send({ error: "Unauthorized access" });
    }
};

// Middleware function for checking if the user is an admin
const isAdmin = async (req, res, next) => {
    try {
        // Admin authentication logic here
        next();
    } catch (error) {
        res.status(403).send({ error: "Admin access required" });
    }
};

// POST route for user login/authentication
router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

        const token = user.generateAuthToken();
        res.status(200).send({ data: { token, userType: user.userType }, message: "Logged in successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Validation function using Joi schema
const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = router;
module.exports.auth = auth;
module.exports.isUser = isUser;
module.exports.isAdmin = isAdmin;

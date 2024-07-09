require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const passwordResetRoutes = require("./routes/passwordReset");
const orders = require("./routes/orders");
const productsRoute = require("./routes/products");
const fs = require('fs');
const path = require('path');




const app = express();

// Database connection
connection();

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api/orders", orders);
app.use("/api/products", productsRoute);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

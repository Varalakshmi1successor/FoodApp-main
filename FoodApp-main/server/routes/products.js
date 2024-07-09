const router = require("express").Router();
const Product = require("../models/products");
const cloudinary = require("../utils/cloudinary");
const multer = require("multer");
const fs = require('fs');
const path = require('path');

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new product 
router.post("/", upload.single('image'), async (req, res) => {
  try {
    
    const { name, desc, quantity, price } = req.body;
    const image = req.file; // multer stores the uploaded file in req.file

    // Check if file was uploaded
    if (!image) {
      throw new Error('Image upload failed or no image provided');
    }

    // Upload image to Cloudinary
    const uploadedResponse = await cloudinary.uploader.upload(image.path, {
      upload_preset: "Food_App", // Replace with your Cloudinary upload preset
    });

    // Remove the file from the uploads folder after uploading to Cloudinary
    fs.unlinkSync(image.path);

    // Create new product instance
    const product = new Product({
      name,
      desc,
      quantity,
      price,
      image: uploadedResponse.secure_url, // Store Cloudinary image URL
    });

    // Save product to MongoDB
    const savedProduct = await product.save();
    res.status(200).send(savedProduct);

  } catch (error) {
    // Multer specific errors
    if (error instanceof multer.MulterError) {
      console.error('Multer error:', error);
      res.status(400).send('Multer Error: ' + error.message);
    } else {
      console.error('Error creating product:', error);
      res.status(500).send(error.message);
    }
  }
});

module.exports = router;

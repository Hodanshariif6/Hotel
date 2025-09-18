const productModel = require("../model/productModel");

const createProduct = async (req, res) => {
  try {
    console.log("👉 Body Data:", req.body);   // debug request body
    console.log("👉 File Data:", req.file);   // debug uploaded file

    const { name, price, desc, quantity, category, detail } = req.body;

    // validate required fields
    if (!name || !price || !desc || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newData = new productModel({
      name,
      price,
      desc,
      quantity,
      prImage: req.file.filename, // multer saves filename
      category,
      detail,
    });

    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    console.error("❌ CreateProduct Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { createProduct };

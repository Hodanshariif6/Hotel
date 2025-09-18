const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const productRouter = require("./Router/productRouter");
const newsRouter = require("./Router/newsRouter");
const customerRouter = require("./Router/customerRoutes");
const orderRouter = require("./Router/orderRouter");
const adminRouter = require("./Router/adminRouter");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(newsRouter);
app.use(productRouter);
app.use(customerRouter);
app.use(orderRouter);
app.use(adminRouter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

app.use("/allImages", express.static("images"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

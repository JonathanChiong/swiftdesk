const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  product: {
    type: String,
    trim: true,
    required: true,
  },
  stocks: {
    type: Number,
    default: 0,
  },
  basePrice: {
    type: Number,
    default: 0,
    min: [0, "Value must be greater than 0."],
  },
  sellPrice: {
    type: Number,
    default: 0,
    min: [0, "Value must be greater than 0"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

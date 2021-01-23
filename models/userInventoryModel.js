const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInventoryModel = new Schema({
  product: {
    type: String,
    trim: true,
  },
  stocks: {
    type: Number,
    default: 0,
    min: 0,
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

const UserInventory = mongoose.model("UserInventory", userInventoryModel);

module.exports = UserInventory;

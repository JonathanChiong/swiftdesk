const router = require("express").Router();
const mongoose = require("mongoose");
let UserInventory = require("../models/userInventoryModel");

router.route("/").get(async (req, res) => {
  try {
    const inventory = await UserInventory.find();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.route("/add").post(async (req, res) => {
  const { product, stocks, basePrice, sellPrice } = req.body;
  const capsProduct = product.toUpperCase();

  try {
    const newProduct = UserInventory({
      product: capsProduct,
      stocks,
      basePrice,
      sellPrice,
    });
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json(`Error: Product exists or unable to save`);
  }
});

router.route("/delete/:id").delete((req, res) => {
  UserInventory.deleteOne({ _id: req.params.id })
    .then(() => res.send("Product deleted"))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

router.route("/update/:id").patch(async (req, res) => {
  const { id: _id } = req.params;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.send(`Object with id: ${_id} is not found in database`);
  }

  const updatedPost = await UserInventory.findByIdAndUpdate(_id, update, {
    new: true,
  });

  res.send(updatedPost);
});

module.exports = router;

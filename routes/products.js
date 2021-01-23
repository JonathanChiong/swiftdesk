const router = require("express").Router();
let Product = require("../models/productModel");

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

router.route("/add").post((req, res) => {
  const { product, stocks, basePrice, sellPrice } = req.body;

  const newProduct = new Product({
    product,
    stocks,
    basePrice,
    sellPrice,
  });

  newProduct
    .save()
    .then(() => res.json("Product has been added"))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

module.exports = router;

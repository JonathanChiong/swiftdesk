const router = require("express").Router();
let Transaction = require("../models/transactionModel");
let Products = require("../models/userInventoryModel");

router.route("/").get((req, res) => {
  Transaction.find()
    .then((transaction) => res.send(transaction))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

router.route("/add").post(async (req, res) => {
  const { f_name, l_name, order } = req.body;

  try {
    const newTransaction = new Transaction({
      f_name,
      l_name,
      order,
    });

    for (const product of order) {
      let newProduct = await Products.findOneAndUpdate(
        { product: product.product },
        { $inc: { stocks: -product.quantity } }
      );

      await newProduct.save();
    }

    await newTransaction.save();
    res.status(200).json(newTransaction);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;

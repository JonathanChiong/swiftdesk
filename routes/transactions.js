const router = require("express").Router();
let Transaction = require("../models/transactionModel");

router.route("/").get((req, res) => {
  Transaction.find()
    .then((transaction) => res.send(transaction))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

router.route("/add").post((req, res) => {
  const { f_name, l_name, order, subTotal, quantity } = req.body;

  const newTransaction = new Transaction({
    f_name,
    l_name,
    order,
    subTotal,
    quantity,
  });

  newTransaction
    .save()
    .then((response) => res.send(response))
    .catch((err) => res.status(400).json(`Error ${err.message}`));
});

module.exports = router;

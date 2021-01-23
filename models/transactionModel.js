const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  subTotal: {
    type: Number,
  },
});

const transactionSchema = new Schema(
  {
    f_name: {
      type: String,
      required: true,
    },
    l_name: {
      type: String,
    },
    invoice_num: {
      type: Number,
      unique: true,
    },
    order: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
    },
  },
  { timestamps: { createdAt: true } }
);

transactionSchema.plugin(AutoIncrement, {
  inc_field: "invoice_num",
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;

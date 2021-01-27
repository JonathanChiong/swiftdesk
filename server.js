const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 80;
const { MONGO_URI } = require("./config/keys");
const connection = mongoose.connection;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

connection.once("open", () => {
  console.log("MongoDB database connection established successfully.");
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//ADDING OF ROUTES
const products = require("./routes/products");
const userInventory = require("./routes/userInventory");
const transactions = require(".//routes/transactions");
app.use("/api/products", products);
app.use("/api/user/inventory", userInventory);
app.use("/api/transactions", transactions);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

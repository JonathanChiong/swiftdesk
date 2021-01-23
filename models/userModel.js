const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fname: {
    type: String,
    required: true,
    trim: true,

  },
  lname: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
      type:String,
      trim: true,
      required:[true,"Username is required."]
      unique:[true,"Username already exists."],
  },
  password:{
      type:String,
      required:[true,"Password is required."]
  },

});

const User = mongoose.model("User", userSchema);

module.exports = User;

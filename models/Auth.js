const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Your username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports  = mongoose.model('Auth', AuthSchema);


const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports  = mongoose.model('Auth', AuthSchema);

const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: function() { return !this.phone; },
  },
  email: {
    type: String,
    unique: true,
    required: function() { return !this.phone; },
  },
  phone: {
    type: String,
    unique: true,
    required: function() { return !this.email; },
  },
  password: {
    type: String,
    required: function() { return !this.phone; },  // Password required if not phone-based user
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;

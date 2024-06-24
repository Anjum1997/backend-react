const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model('Otp', OtpSchema);

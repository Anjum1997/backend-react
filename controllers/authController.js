const Auth = require('../models/Auth');
const Otp = require('../models/Otp');
const client = require('../utilis/Twilio');
const bcrypt = require('bcryptjs');
const { registerSchema, loginSchema, requestPasswordResetSchema, resetPasswordSchema, phoneSignInSchema, otpVerificationSchema } = require('../utilis/validation');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken, generatePasswordResetToken, verifyPasswordResetToken  } = require('../utilis/jwt');
const { sendResetPasswordEmail } = require('../utilis/nodeMailer');


// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const { error } = registerSchema.validate({ username, email, password });
  
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    let user = await Auth.findOne({ email });
    if (user) {
      return res.status(400).send('User already exists');
    }

    user = new Auth({ username, email, password, });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    return res.status(201).send({ msg: 'User registered successfully',user });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return res.send({ msg: 'Login successful', accessToken, refreshToken });
  } catch (err) {
    res.status(500).send('Server error');
  }
};


// Refresh token
exports.refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const user = await verifyRefreshToken(token);
    if (!user) {
      return res.status(403).send('Invalid refresh token.');
    }

    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    return res.send({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    res.status(500).send('Server error');
  }
};


// Request password reset
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const { error } = requestPasswordResetSchema.validate({ email });

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).send('No user found with that email address');
    }

    const token = generatePasswordResetToken(user);
    await sendResetPasswordEmail(user.email, token);

    return res.status(200).send({ msg: 'A password reset email has been sent to ' + user.email , token});
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const { error } = resetPasswordSchema.validate({ token, newPassword });

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const decoded = await verifyPasswordResetToken(token);
    const user = await Auth.findById(decoded.id);

    if (!user) {
      return res.status(400).send('Password reset token is invalid or has expired');
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).send('Password has been reset successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Generate OTP and send it via SMS
exports.signInWithPhone = async (req, res) => {
  const { phone } = req.body;
  const { error } = phoneSignInSchema.validate({ phone });

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Generate a 6-digit OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Set OTP expiration time (5 minutes)
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  try {
    // Save OTP to the database
    const otp = new Otp({ phone, code: otpCode, expiresAt });
    await otp.save();
    const phoneNumber = `+91${7082098254}`; 
    // Send OTP via SMS
    await client.messages.create({
      body: `Your verification code is ${otpCode}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
    res.status(200).send({ msg: 'OTP sent successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Verify OTP and authenticate user
exports.verifyOtp = async (req, res) => {
  const { phone, code } = req.body;
  const { error } = otpVerificationSchema.validate({ phone, code });

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const otp = await Otp.findOne({ phone, code });
    if (!otp) {
      return res.status(400).send('Invalid OTP');
    }

    if (otp.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: otp._id });
      return res.status(400).send('OTP has expired');
    }

    // Find or create user
    let user = await Otp.findOne({ phone });
    if (!user) {
      user = new Otp({ phone });
      await user.save();
    }
    const token = generateAccessToken(user);

    // Delete OTP after verification
    await Otp.deleteOne({ _id: otp._id });

    res.status(200).send({ msg: 'Authentication successful', token});
  } catch (err) {
    res.status(500).send('Server error');
  }
};
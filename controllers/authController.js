const Auth = require('../models/Auth');
const bcrypt = require('bcryptjs');
const { registerSchema, loginSchema } = require('../utilis/validation');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utilis/jwt');

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

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Auth = require('../models/Auth');
dotenv.config();

const generateAccessToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    phone: user.phone
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    phone: user.phone
    
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return reject(err);
      const user = await Auth.findById(decoded.id);
      if (!user) return reject('User not found');
      resolve(user);
    });
  });
};

const generatePasswordResetToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email
  };
  return jwt.sign(payload, process.env.PASSWORD_RESET_SECRET, { expiresIn: '1h' });
};

const verifyPasswordResetToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.PASSWORD_RESET_SECRET, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};

module.exports = { generateAccessToken, generateRefreshToken, verifyRefreshToken, generatePasswordResetToken, verifyPasswordResetToken };

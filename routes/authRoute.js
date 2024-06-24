const express = require('express');
const { registerUser, loginUser, refreshToken ,requestPasswordReset, resetPassword ,signInWithPhone, verifyOtp } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken); 
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password' , resetPassword);
router.post('/signin-phone', signInWithPhone);
router.post('/verify-otp', verifyOtp);


module.exports = router;

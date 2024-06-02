const Auth = require('../models/Auth');
const bcrypt = require('bcryptjs');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  try {
    let user = await Auth.findOne({ email });
    if (user) {
      return res.status(400).send('User already exists');
    }

    user = new Auth({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).send({ msg: 'User registered successfully',user});
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('All fields are required');
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

    res.send('Login successful');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

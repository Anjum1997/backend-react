
 const User = require('../models/user');
 const bcrypt = require('bcryptjs');
 const users = require('../test/MOCK_DATA.json');
 const { uploadSingle, uploadMultiple } = require('../uploads/upload');
 

 exports.getAllItems = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $lookup: {
          from: 'products', 
          let: { userId: '$id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$product_id', '$$userId'] },
              }
            }
          ],
          as: 'user_products'
        }
      },
      {
          $match: { 'user_products.price': { $gt: 500 } } 
        },
  
    ]);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
 }

 // Get all users
 exports.getAllUsers = (req, res) => {
   res.json(users);
 };
 
 // Get a single user by ID
 exports.getUserById = (req, res) => {
   const user = users.find((u) => u.id == req.params.id);
   if (user) {
     res.json(user);
   } else {
    res.status(404).send('User not found');
   }
 };
 
 // Create a new user
 exports.createUser = async (req, res) => {
  const { firstname, lastname, email, contact, address, password } = req.body;
 
   try {
     let user = await User.findOne({ email });
     if (user) {
       return res.status(400).json({ msg: 'User already exists' });
     }

     user = new User ({  
      firstname,
      lastname,
      email,
      contact, 
      address,
      password,
     });
 
     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(password, salt);
 
     await user.save();
 
     res.status(201).send({ msg: 'User registered successfully', user });
   } catch (err) {
     console.error(err.message);
     res.status(500).send('Server error');
   }
 };
 
 // Update a user by ID
 exports.updateUserById = async (req, res) => {
  const { firstname, lastname, email, contact, address, password } = req.body;
   try {
     const user = await User.findById(req.params.id);
     if (!user) {
       return res.status(404).json({ msg: 'User not found' });
     }
 
user.firstname = firstname || user.firstname;
user.lastname = lastname || user.lastname;
user.email = email || user.email;
user.contact = contact || user.contact;
user.address = address || user.address;
     if (password) {
       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(password, salt);
     }
 
     await user.save();
     res.json(user);
   } catch (err) {
     console.error(err.message);
     res.status(500).send('Server error');
   }
 };
 
 // Delete a user by ID
 exports.deleteUserById = async (req, res) => {
   try {
     const user = await User.findById(req.params.id);
     if (!user) {
       return res.status(404).json({ msg: 'User not found' });
     }

     await User.deleteOne({ _id: req.params.id });
      return res.status(404).json({ msg: 'User deleted successfully' });
    
   } catch (err) {
     console.error(err.message);
     res.status(500).send('Server error');
   }
 };


// File upload handlers
exports.uploadSingleFile = (req, res) => {
    uploadSingle(req, res, (err) => {
        if (err) {
            res.status(400).send({ message: err });
        } else {
            if (!req.file) {
                res.status(400).send({ message: 'No file selected!' });
            } else {
                res.send({ message: 'File uploaded!', file: req.file });
            }
        }
    });
};

exports.uploadMultipleFiles = (req, res) => {
    uploadMultiple(req, res, (err) => {
        if (err) {
            res.status(400).send({ message: err });
        } else {
            if (!req.files || req.files.length === 0) {
                res.status(400).send({ message: 'No files selected!' });
            } else {
                res.send({ message: 'Files uploaded!', files: req.files });
            }
        }
    });
};



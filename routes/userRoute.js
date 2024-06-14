const express = require('express');
const router = express.Router();
const userController  = require("../controllers/userControl.js")

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);
router.get('/aggregation', userController.getAllItems);
// File upload routes
router.post('/uploadSingle', userController.uploadSingleFile);
router.post('/uploadMultiple', userController.uploadMultipleFiles);

module.exports = router;

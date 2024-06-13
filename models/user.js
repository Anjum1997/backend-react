
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength:12
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength:12
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    contact: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 15,
        match: [/^\d{3}-\d{3}-\d{4}$/, 'Please enter a valid contact number in the format xxx-xxx-xxxx']
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    date: {
        type: Date,
        default: Date.now
    },
   
    products: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
});

module.exports = mongoose.model('User', UserSchema);

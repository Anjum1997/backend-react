
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
  product_id: { type: Number, required: true},
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  rating: { type: Number, required: true },
  user: {type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Product', ProductSchema);

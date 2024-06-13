const Product = require('../models/Product');
const products = require('../test/PRODUCT_DATA.json');


// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ product_id: req.params.id });
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { product_id, name, category, price, stock, rating } = req.body;

  try {
    let product = await Product.findOne({ product_id });
    if (product) {
      return res.status(400).json({ msg: 'Product already exists' });
    }

    product = new Product({
      product_id,
      name,
      category,
      price,
      stock,
      rating,
    });

    await product.save();

    res.status(201).send({ msg: 'Product created successfully', product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
  const { name, category, price, stock, rating } = req.body;
  try {
    const product = await Product.findOne({ product_id: req.params.id });
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.rating = rating || product.rating;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ product_id: req.params.id });
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    await Product.deleteOne({ product_id: req.params.id });
    res.status(200).json({ msg: 'Product deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

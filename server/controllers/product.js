const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send('Create product failed');
    res.status(400).json({ err: err.message });
  }
};

exports.read = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0)
      return res.status(400).json({ err: 'No products found!' });

    return res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error!');
  }
};

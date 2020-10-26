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

exports.listAll = async (req, res) => {
  const products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate('category')
    .populate('subs')
    .sort([['createdAt', 'desc']])
    .exec();

  return res.json(products);
};

exports.remove = async (req, res) => {
  const { slug } = req.params;
  try {
    let deleted = await Product.findOne({ slug });
    if (!deleted) return res.status(400).json({ err: 'Product not found!' });
    deleted = await Product.findOneAndDelete({ slug });
    return res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error!');
  }
};

exports.read = async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.findOne({ slug })
      .populate('category')
      .populate('subs');

    if (!product) return res.status(400).json({ err: 'No product found!' });

    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error!');
  }
};

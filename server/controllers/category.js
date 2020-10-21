const Category = require('../models/category');
const slugify = require('slugify');
const { findOne } = require('../models/category');

exports.create = async (req, res) => {
  const { name } = req.body;
  try {
    const category = new Category({ name, slug: slugify(name) });

    await category.save();

    return res.status(201).json(category);
  } catch (err) {
    console.log(err);
    res.status(400).send('Create category failed');
  }
};

exports.list = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });

    if (!categories) return res.status(400).json({ err: 'No category found!' });

    return res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error!');
  }
};

exports.read = async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await Category.findOne({ slug });

    if (!category) return res.status(400).json({ err: 'No category found!' });

    return res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error!');
  }
};

exports.update = async (req, res) => {
  const { name } = req.body;
  const { slug } = req.params;
  try {
    let updated = await Category.findOne({ slug });
    if (!updated) return res.status(400).json({ err: 'Category not found!' });

    updated = await Category.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name) },
      { new: true }
    );

    return res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send('Create update failed');
  }
};

exports.remove = async (req, res) => {
  const { slug } = req.params;
  try {
    let deleted = await Category.findOne({ slug });
    if (!deleted) return res.status(400).json({ err: 'Category not found!' });

    deleted = await Category.findOneAndDelete({ slug });
    return res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error!');
  }
};

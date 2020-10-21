const Category = require('../models/category');
const slugify = require('slugify');

exports.create = async (req, res) => {
  const { name } = req.body;
  try {
    const category = new Category({ name, slug: slugify(name) });

    await category.save();

    return res.status(201).json(category);
  } catch (err) {
    console.log(err);
    res.status(400).json('Create category failed!');
  }
};

exports.list = async (req, res) => {};

exports.read = async (req, res) => {};

exports.update = async (req, res) => {};

exports.remove = async (req, res) => {};

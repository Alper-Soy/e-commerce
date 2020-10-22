const Sub = require('../models/sub');
const slugify = require('slugify');

exports.create = async (req, res) => {
  let { name, parent } = req.body;
  name = name.charAt(0).toUpperCase() + name.slice(1);
  try {
    const sub = new Sub({ name, slug: slugify(name), parent }).populate(
      'parent',
      'name'
    );

    await sub.save();

    return res.status(201).json(sub);
  } catch (err) {
    console.log(err);
    res.status(400).send('Create sub failed');
  }
};

exports.list = async (req, res) => {
  try {
    const sub = await Sub.find({}).sort({ createdAt: -1 });

    if (!sub) return res.status(400).json({ err: 'No sub category found!' });

    return res.status(200).json(sub);
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error!');
  }
};

exports.read = async (req, res) => {
  const { slug } = req.params;
  try {
    const sub = await Sub.findOne({ slug });

    if (!sub) return res.status(400).json({ err: 'No sub category found!' });

    return res.status(200).json(sub);
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error!');
  }
};

exports.update = async (req, res) => {
  let { name, parent } = req.body;
  const { slug } = req.params;
  name = name.charAt(0).toUpperCase() + name.slice(1);
  try {
    let updated = await Sub.findOne({ slug });
    if (!updated)
      return res.status(400).json({ err: 'Sub category not found!' });

    updated = await Sub.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name), parent },
      { new: true }
    );

    return res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send('Sub category update failed');
  }
};

exports.remove = async (req, res) => {
  const { slug } = req.params;
  try {
    let deleted = await Sub.findOne({ slug });
    if (!deleted)
      return res.status(400).json({ err: 'Sub category not found!' });

    deleted = await Sub.findOneAndDelete({ slug });
    return res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error!');
  }
};

const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { name: name ? name : email.split('@')[0], picture },
      { new: true }
    );

    if (user) {
      console.log('USER UPDATED', user);
      return res.json(user);
    }

    const newUser = await new User({
      email,
      name: name ? name : email.split('@')[0],
      picture,
    }).save();
    console.log('USER CREATED', newUser);
    return res.json(newUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Server Error!' });
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select('-__v');

    if (!user) return res.status(400).json({ error: 'User not found!' });

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};

const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { name, picture },
      { new: true }
    );

    if (user) {
      console.log('USER UPDATED', user);
      return res.json(user);
    }

    const newUser = await new User({
      email,
      name,
      picture,
    }).save();
    console.log('USER CREATED', newUser);
    return res.json(newUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Server Error!' });
  }
};

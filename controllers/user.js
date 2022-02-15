const User = require('../models/user');

exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(res.status(201))
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send(err.message));
};

exports.updateUserInfo = (req, res) => {
  const { userId } = req.user._id;
  User.findByIdAndUpdate(userId, { name: 'Boss of the Gym', about: 'Gachi' }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then(res.status(201))
    .then((newUserInfo) => res.send({ data: newUserInfo }))
    .catch((err) => res.status(500).send(err.message));
};

exports.updateUserAvatar = (req, res) => {
  const { userId } = req.user._id;
  User.findByIdAndUpdate(userId, { avatar: 'https://i1.sndcdn.com/artworks-000651764767-zbla7n-t500x500.jpg' }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then(res.status(201))
    .then((newUserAvatar) => res.send({ data: newUserAvatar }))
    .catch((err) => res.status(500).send(err.message));
};

exports.getUsers = (req, res) => {
  User.find({})
    .then(res.status(200))
    .then((users) => res.send({ data: users }));
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send(`Пользователь с id: ${userId} не обнаружен`);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

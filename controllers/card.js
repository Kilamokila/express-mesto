const Card = require('../models/card');

exports.addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then(res.status(201))
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send(err.message));
};

exports.getCards = (req, res) => {
  Card.find({})
    .then(res.status(200))
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send(err.message));
};

exports.deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (card) {
      Card.findByIdAndRemove(cardId);
    } else {
      res.status(404).send(`Карточка с id: ${cardId} не обнаружена на сервере`);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteCardLike = async (req, res) => {
  try {
    const { cardId } = req.user._id;
    await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.putCardLike = async (req, res) => {
  try {
    const { cardId } = req.user._id;
    await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
};

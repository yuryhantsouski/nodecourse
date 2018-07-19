import validator from 'validator';

import User from '../models/user';

exports.list = async (req, res) => {
  try {
    const query = req.query || {};

    const users = await User.find(query);

    return res.status(200).json({ users });
  } catch (e) {
    return res.status(422).send(e);
  }
}

exports.get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    return res.status(200).json({ user });
  } catch (e) {
    return res.status(404).json({ message: 'User Not Found.' });
  }
}

exports.post = async (req, res) => {
  try {
    const data = req.body;

    if (data.name && !validator.isAlphanumeric(data.name)) {
      return res.status(422).json({ message: 'Name must be alphanumeric.' });
    }

    const user = await User.create(data);

    return res.status(201).json({ user });
  } catch (e) {
    return res.status(500).send(e);
  }
}

exports.delete = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });

    return res.sendStatus(404);
  } catch (e) {
    return res.status(422).send(e);
  }
}

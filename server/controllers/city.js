import validator from 'validator';

import City from '../models/city';

exports.list = async (req, res) => {
  try {
    const query = req.query || {};

    const cities = await City.find(query);

    return res.status(200).json({ cities });
  } catch (e) {
    return res.status(422).send(e);
  }
}

exports.get = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    return res.status(200).json({ city });
  } catch (e) {
    return res.status(404).json({ message: 'City Not Found.' });
  }
}

exports.put = async (req, res) => {
  try {
    const data = req.body;

    if (data.name && !validator.isAlphanumeric(data.name)) {
      return res.status(422).json({ message: 'Name must be alphanumeric.' });
    }

    const city = await City.findByIdAndUpdate({ _id: req.params.id }, data, { new: true });

    if (!city) {
      return res.sendStatus(404);
    }

    return res.json({ city });

  } catch (e) {
    return res.status(422).send(e);
  }
}

exports.post = async (req, res) => {
  try {
    const data = req.body;

    if (data.name && !validator.isAlphanumeric(data.name)) {
      return res.status(422).json({ message: 'Name must be alphanumeric.' });
    }

    const city = await City.create(data);

    return res.status(201).json({ city });
  } catch (e) {
    return res.status(500).send(e);
  }
}

exports.delete = async (req, res) => {
  try {
    await City.deleteOne({ _id: req.params.id });

    return res.sendStatus(404);
  } catch (e) {
    return res.status(422).send(e);
  }
}

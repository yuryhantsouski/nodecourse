import validator from 'validator';

import Product from '../models/product';

exports.list = async (req, res) => {
  try {
    const query = req.query || {};

    const products = await Product.find(query);

    return res.status(200).json({ products });
  } catch (e) {
    return res.status(422).send(e);
  }
}

exports.get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    return res.status(200).json({ product });
  } catch (e) {
    return res.status(404).json({ message: 'Product Not Found.' });
  }
}

exports.post = async (req, res) => {
  try {
    const data = req.body;

    if (data.name && !validator.isAlphanumeric(data.name)) {
      return res.status(422).json({ message: 'Name must be alphanumeric.' });
    }

    const product = await Product.create(data);

    return res.status(201).json({ product });
  } catch (e) {
    return res.status(500).send(e);
  }
}

exports.delete = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });

    return res.sendStatus(404);
  } catch (e) {
    return res.status(422).send(e);
  }
}

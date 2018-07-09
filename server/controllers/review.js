import validator from 'validator';

import Review from '../models/review';

exports.list = async (req, res) => {
  try {
    const query = { productId: req.params.id }

    const reviews = await Review.find(query);

    return res.status(200).json({ reviews });
  } catch (e) {
    return res.status(422).send(e);
  }
}

exports.post = async (req, res) => {
  try {
    const data = Object.assign({}, req.body, { productId: req.params.id });

    const review = await Review.create(data);

    return res.status(201).json({ review });
  } catch (e) {
    return res.status(500).send(e);
  }
}

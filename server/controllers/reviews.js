const Review = require('../models').Review;

export const reviewsController = {
  async create(req, res) {
    try {
      const review = await Review.create({ text: req.body.text, productId: req.params.id * 1 });

      return res.status(201).json({ review });
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async list(req, res) {
    try {
      const productId = req.params.id;
      const reviews = await Review.findAll({
        where: {
          productId
        },
      });

      return res.status(200).json({ reviews });
    } catch (e) {
      return res.status(400).send(e);
    }
  }
};
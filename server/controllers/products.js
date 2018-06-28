const Product = require('../models').Product;
const Review = require('../models').Review;

export const productsController = {
  async create(req, res) {
    try {
      const product = await Product.create({
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price
      });

      return res.status(201).json({ product });
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async list(req, res) {
    try {
      const products = await Product.findAll({
        include: [{
          model: Review,
          as: 'reviews',
        }],
      });

      return res.status(200).json({ products });
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async retrieve(req, res) {
    try {
      const product = await Product.findById(req.params.id);

      return res.status(200).json({ product });
    } catch (e) {
      return res.status(404).json({ message: 'Product Not Found' });
    }
  }
};


import data from '../../data';

export default (req, res) => {
  const product = req.product;

  res.status(200).json({ product });
};
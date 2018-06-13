import data from '../../data';

export default (req, res) => {
  const products = data.products;

  res.status(200).json({ products });
};
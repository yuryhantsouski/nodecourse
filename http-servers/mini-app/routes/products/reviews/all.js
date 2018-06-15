import data from '../../../data';

export default (req, res) => {
  const productId = req.params.id * 1;
  const reviews = data.reviews.filter(r => r.productId === productId);

  res.status(200).json({ reviews });
};
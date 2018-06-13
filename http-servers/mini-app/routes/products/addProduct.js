import { Products } from '../../models';

const nameValidation = string => !string || string.length < 2 || string.length > 50;
const products = new Products();

export default (req, res) => {
  const { name, brand } = req.body;
  let { price, options } = req.body;

  if (typeof price !== 'number') {
    price = parseInt(price, 10);
  }

  if (isNaN(price) || price < 0 ) {
    return res.status(400).end('"price" must be a valid integer');
  }

  if (nameValidation(name)) {
    return res.status(400).end('"name" must be a string with length between 0 and 50');
  }

  if (nameValidation(brand)) {
    return res.status(400).end('"brand" must be a string with length between 0 and 50');
  }

  if (options === undefined) {
    return res.status(400).end('"options" must provide an array with {"color": "..."}, {"size": "..."} shape')
  }

  options ? options = JSON.parse(options) : null;

  if (!Array.isArray(options)) {
    return res.status(400).end('"options" must be an array with {"color": "...", "size": "..."} shape')
  }

  products.create({ name, brand, price, options });

  res.status(201).json({ message: 'product has been created' });
}
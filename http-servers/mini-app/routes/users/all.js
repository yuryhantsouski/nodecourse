import data from '../../data';

export default (req, res) => {
  const users = data.users;

  res.status(200).json({ users });
};
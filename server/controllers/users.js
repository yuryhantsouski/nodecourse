const User = require('../models').User;

export const usersController = {
  async create(req, res) {
    try {
      const user = await User.create({
        name: req.body.name,
        age: req.body.age
      });

      return res.status(201).json({ user });
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async list(req, res) {
    try {
      const users = await User.all();

      return res.status(200).json({ users });
    } catch (e) {
      return res.status(400).send(e);
    }
  }
};
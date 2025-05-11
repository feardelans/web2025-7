const { User } = require('../models');


// Post /register-user
exports.registerUser = async (req, res) => {
  const { user_name } = req.body;

  if (!user_name) return res.status(400).json({ error: 'user_name is required' });

  try {
    const user = await User.create({ user_name });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'User already exists or invalid' });
  }
};

// Get /users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
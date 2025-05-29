const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = []; // Replace with your DB

// Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Register
exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, username, password: hashed };
  users.push(user);
  res.status(201).json({ message: 'User registered', user: { id: user.id, username: user.username } });
};

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user);
  res.json({ token });
};

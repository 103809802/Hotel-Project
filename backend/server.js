const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/hotel');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});
const User = mongoose.model('User', UserSchema);

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // 🧠 Check for existing username or email
  const existingUser = await User.findOne({ 
    $or: [{ username }, { email }] 
  });

  if (existingUser) {
    return res.status(400).json({ 
      message: 'Username or email already exists' 
    });
  }

  // 🧩 Password strength validation
  // Must be at least 8 characters, include uppercase, lowercase, number, and special character
  const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!strongPasswordPattern.test(password)) {
    return res.status(400).json({ 
      message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.' 
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();

  res.json({ message: 'User registered!' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    res.json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
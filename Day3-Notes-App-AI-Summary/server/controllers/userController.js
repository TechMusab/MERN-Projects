import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user
export const register = async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json({
      message: 'User registered successfully',
      userId: savedUser._id,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error registering user',
      error: err.message,
    });
  }
};

// Login user
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        message: 'Login Successful',
        token,
      });
    } else {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error logging in',
      error: err.message,
    });
  }
};

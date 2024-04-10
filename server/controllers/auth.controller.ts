import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import User from '../models/user.model';

const saltRounds = 10;
const SECRET_KEY = process.env.SECRET_KEY || '';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate email
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: 'Valid email is required' });
    }

    // Validate password
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign({ user }, 'secretkey');

    res.status(200).json({ user, token, message: 'Successfully Logged In' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    // Validate name
    if (!username || typeof username !== 'string') {
      return res.status(400).json({ message: 'Username is required' });
    }

    // Validate email
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: 'Valid email is required' });
    }

    // Validate password
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin,
    });
    // Save user to database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// src/controllers/userController.ts
import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Controller for user registration (sign up)
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user
    const newUser: IUser = new User({
      username,
      password: hashedPassword,
      role: role || "user", // Default role is "user"
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Controller for user login
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const payload = { id: user._id, role: user.role };
    const secretKey = "your_secret_key_here"; // Replace with your actual secret key
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
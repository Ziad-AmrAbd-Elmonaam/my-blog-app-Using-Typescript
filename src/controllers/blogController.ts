// src/controllers/blogController.ts
import { Request, Response } from "express";
import Blog, { IBlog } from "../models/blog";
import { createBlogValidator } from "../validators/blogValidator";
import User, { IUser } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Controller to create a new blog post
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
    const token = jwt.sign(payload, "your_secret_key_here", { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


export const getBlogs = async (req: Request, res: Response) => {
  try {
     
        const blogs = await Blog.find();
        res.status(200).json(blogs);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};


export const createBlog = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const { error } = createBlogValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { title, description } = req.body;

    const newBlog: IBlog = new Blog({
      title,
      description,
    });

    await newBlog.save();

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Blog.findByIdAndDelete(id);

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
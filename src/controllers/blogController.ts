// src/controllers/blogController.ts
import { Request, Response } from "express";
import Blog, { IBlog } from "../models/blog";
import { createBlogValidator } from "../validators/blogValidator";


// Controller to create a new blog post
// Controller for user login


export const getBlogs = async (req: Request, res: Response) => {
  try {
    
    
     
        const blogs = await Blog.find();
        res.status(200).json(blogs);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
export const getBlog = async (req: Request, res: Response) => {
  try {
    //check if this is the blog owner
    
    const blog = await Blog.findById(req.params.id);
    res.status(200).json(blog);
  } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
  };

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { error } = createBlogValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { title, description } = req.body;
    const userId = req.user?.id; // Get the authenticated user's ID from req.user

    // Check if the user is authenticated and has an ID
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const newBlog: IBlog = new Blog({
      title,
      description,
      user: userId, // Set the user field to the authenticated user's ID
    });

    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if the user is authenticated and has an ID
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Find the blog by ID
    const blog = await Blog.findById(id);

    // Check if the blog exists
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Check if the authenticated user is the owner of the blog
    if (blog.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to delete this blog" });
    }

    // Delete the blog
    await blog.deleteOne();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
export const updateBlog = async (req: Request, res: Response) => {

  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Find the blog by ID
    const blog = await Blog.findById(id);

    // Check if the blog exists
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Check if the authenticated user is the owner of the blog
    if (blog.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to update this blog" });
    }

    // Update the blog
    blog.title = title;
    blog.description = description;
    const updatedBlog = await blog.save();

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
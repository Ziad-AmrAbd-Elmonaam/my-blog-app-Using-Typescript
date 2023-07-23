// src/routes/blogRoutes.ts
import { Router } from "express";
import { createBlog, deleteBlog, getBlogs, updateBlog } from "../controllers/blogController";
import { authenticateUser, checkAdminRole } from "../middlewares/authMiddleware";

const router = Router();

// Route to create a new blog post
router.post("/createBlogs",authenticateUser, checkAdminRole, createBlog);
router.get("/getBlogs",authenticateUser, checkAdminRole, getBlogs);
router.delete("/deleteBlog/:id", deleteBlog);
router.put("/updateBlog/:id", updateBlog);

export default router;

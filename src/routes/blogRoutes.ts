// src/routes/blogRoutes.ts
import { Router } from "express";
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "../controllers/blogController";
import { authenticateUser, checkAdminRole } from "../middlewares/authMiddleware";

const router = Router();

// Route to create a new blog post
router.post("/createBlogs", authenticateUser,createBlog);
router.get("/getBlogs", authenticateUser, checkAdminRole, getBlogs);
router.get("/getBlog/:id",authenticateUser,  getBlog);
router.delete("/deleteBlog/:id", authenticateUser,deleteBlog);
router.put("/updateBlog/:id", authenticateUser,updateBlog);

export default router;

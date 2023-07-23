// src/models/blog.ts
import { Schema, model, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  description: string;
  createdAt: Date;
}

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Blog = model<IBlog>("Blog", blogSchema);

export default Blog;

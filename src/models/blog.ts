// src/models/blog.ts
import { Schema, model, Document, Types } from "mongoose";
import { IUser } from "./user";

export interface IBlog extends Document {
  title: string;
  description: string;
  createdAt: Date;
  user: Types.ObjectId | IUser;
}

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

const Blog = model<IBlog>("Blog", blogSchema);

export default Blog;

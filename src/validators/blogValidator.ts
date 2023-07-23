// src/validators/blogValidator.ts
import Joi from "joi";

// Validators for creating a new blog post
export const createBlogValidator = Joi.object({
  title: Joi.string().required().label("Title"),
  description: Joi.string().required().label("Description"),
});

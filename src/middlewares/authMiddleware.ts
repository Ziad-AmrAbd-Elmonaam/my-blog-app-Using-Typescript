// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

interface UserPayload {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: UserPayload; // Use the UserPayload interface for the user property
    }
  }
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key_here") as UserPayload;

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const checkAdminRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
};

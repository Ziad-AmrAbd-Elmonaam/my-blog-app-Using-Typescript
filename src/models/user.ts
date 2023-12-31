// src/models/user.ts
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  role: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = model<IUser>("User", userSchema);
export default User;

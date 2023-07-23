// src/server.ts
import express from "express";
import mongoose from "mongoose";
import blogRoutes from "./routes/blogRoutes";
import userRoutes from "./routes/userRoutes";

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/blog', {}).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log("Not Connected to database ERROR! ", err);
});

const app = express();
app.use(express.json());

// Use blog routes
app.use("/api/", blogRoutes);
app.use("/api/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Press CTRL+C to stop server`);
});

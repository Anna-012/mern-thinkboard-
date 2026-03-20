import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import auth from "./middleware/auth.js";
import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/auth.routes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

/* ================= MIDDLEWARES FIRST ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes); // public
app.use("/api/notes", auth, rateLimiter, noteRoutes); // protected

/* ================= START SERVER ================= */
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT:${PORT}`);
  });
});

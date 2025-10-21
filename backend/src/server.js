import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config(); // Load .env

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json()); //this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

//our simple custom middle
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

// Debug: check if MONGO_URI loaded
// console.log("MONGO_URI:", process.env.MONGO_URI);

// Routes
app.use("/api/notes", noteRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

 app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});


}

// Server listen using PORT variable
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT:${PORT}`);
  });
});

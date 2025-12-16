import express from "express";
import auth from "../middleware/auth.js";
import rateLimiter from "../middleware/rateLimiter.js";
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", auth, rateLimiter, getAllNotes);
router.get("/:id", auth, rateLimiter, getNoteById);
router.post("/", auth, rateLimiter, createNote);
router.put("/:id", auth, rateLimiter, updateNote);
router.delete("/:id", auth, rateLimiter, deleteNote);

export default router;

import express from "express";
import { register, login } from "../controllers/userController.js";
import {
  getnotes,
  addnote,
  updateNote,
  deleteNote,
  getSummary,
} from "../controllers/noteController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/notes", auth, getnotes);
router.post("/notes", auth, addnote);
router.put("/notes/:id", auth, updateNote);
router.delete("/notes/:id", auth, deleteNote);
router.post("/notes/ai/summary", auth, getSummary);

export default router;

import express from "express";
import { getTodayRoutine, createRoutine, getUserRoutines, updateRoutine, deleteRoutine } from "../Controller/RoutineController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/today", auth, getTodayRoutine);
router.post("/", auth, createRoutine);
router.get("/", auth, getUserRoutines);
router.put("/:id", auth, updateRoutine);
router.delete("/:id", auth, deleteRoutine);

export default router;

import express from "express";
import { getExercisesByMuscle, getAllExercises } from "../Controller/ExerciseController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/by-muscle", auth, getExercisesByMuscle);
router.get("/", auth, getAllExercises);

export default router;

import Exercise from "../models/Exercise/exercise-model.js";

export const getExercisesByMuscle = async (req, res) => {
  try {
    const { muscles } = req.query; // Expecting comma separated list or single muscle
    
    if (!muscles) {
      return res.status(400).json({ error: "Muscles are required" });
    }

    const musclesArray = muscles.split(",");
    const exercises = await Exercise.find({ targetMuscle: { $in: musclesArray } });
    
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

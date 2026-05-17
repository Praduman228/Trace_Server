import UserRoutine from "../models/Routine/userRouten.js";

export const getTodayRoutine = async (req, res) => {
  try {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = days[new Date().getDay()];
    
    // In a real app, userId would come from req.user.id (from auth middleware)
    // For now, we'll expect it in the query or header if not using auth middleware yet
    const userId = req.user?.id || req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const routine = await UserRoutine.findOne({ 
      userId, 
      day: today 
    }).populate("exercises.exerciseId");

    if (!routine) {
      return res.status(404).json({ message: `No routine found for ${today}` });
    }

    res.json(routine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createRoutine = async (req, res) => {
  try {
    const routine = new UserRoutine({
      ...req.body,
      userId: req.user?.id || req.body.userId
    });
    await routine.save();
    res.status(201).json(routine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserRoutines = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const routines = await UserRoutine.find({ userId }).populate("exercises.exerciseId");
    res.json(routines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const routine = await UserRoutine.findOneAndUpdate(
      { _id: id, userId: req.user?.id || req.body.userId },
      req.body,
      { new: true }
    );
    if (!routine) return res.status(404).json({ error: "Routine not found" });
    res.json(routine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const routine = await UserRoutine.findOneAndDelete({ 
      _id: id, 
      userId: req.user?.id || req.query.userId 
    });
    if (!routine) return res.status(404).json({ error: "Routine not found" });
    res.json({ message: "Routine deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import routineRoutes from "./routes/routineRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    message: "Express API is running"
  });
});

app.use("/api/users", userRoutes);
app.use("/api/routines", routineRoutes);
app.use("/api/exercises", exerciseRoutes);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

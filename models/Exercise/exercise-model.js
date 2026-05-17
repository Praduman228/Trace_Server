import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    targetMuscle: {
        type: String,
        enum: ['Chest', 'Shoulders', 'Back', 'Legs', 'Biceps', 'Triceps', 'Abs'],
        required: true,
    },

}
 , { timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
export default Exercise;
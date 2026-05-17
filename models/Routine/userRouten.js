import mongoose from "mongoose";

const userRoutineSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    RoutineName: {
        type: String,
        required: true,
    },
    targetMuscle:[{
        type: String,
        enum: ['Chest', 'Shoulders', 'Back', 'Legs', 'Biceps', 'Triceps', 'Abs'],
        required: true,
    }],
    day:{
        type: String,
        required: true,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ,"Sunday"],
    },
    exercises: [
        {
            exerciseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Exercise",
            },
            sets:[{
                sets:{
                    type:Number,
                    required:true,
                },
                weight:{
                    type:Number,
                    required:true,
                },
                reps:{
                    type:Number,
                    required:true,
                },
            }]
        }
    ]
} , {timestamps:true}
);

const UserRoutine = mongoose.model("UserRoutine", userRoutineSchema);
export default UserRoutine;
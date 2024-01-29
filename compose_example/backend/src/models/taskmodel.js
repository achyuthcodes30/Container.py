import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    completed: {
        type: Boolean,
        default: false 
},
 deadline: Date,
 description: String
},{
    timestamps: true
})
const Task = mongoose.model("Task",taskSchema)
export default Task
import Task from "../models/taskmodel.js"

export const getAllTasks = async(req,res) => {
    try{
    const tasks = await Task.find().sort({deadline : 1})
    res.json(tasks)
    } catch(e){
    res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getPendingTasks = async(req,res) => {
    try{
    const pendingTasks = await Task.find({completed : false}).sort({deadline : 1})
    res.json(pendingTasks)
    } catch(e){
    res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getCompletedTasks = async(req,res) => {
    try{
    const completedTasks = await Task.find({completed : true}).sort({updatedAt : 1})
    res.json(completedTasks)
    } catch(e){
    res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const setTaskAsCompleted = async (req,res) => {
    const taskTitle = req.params.taskTitle;
    try{
    const updatedTask = await Task.findOneAndUpdate(
      { title: taskTitle },
      { $set: { completed: true } },
      { new: true } )

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    } catch(e){
       res.status(500).json({ message: 'Internal Server Error' });
    }    
}

export const createTask = async(req,res) => {
   const { title, description, deadline } = req.body;
   try{
    const newTask = new Task({
        title,
        description,
        deadline
    })
    const savedTask = await newTask.save();
    res.json(savedTask);
   } catch(e){
       res.status(500).json({ message: 'Internal Server Error' });
    }   
}
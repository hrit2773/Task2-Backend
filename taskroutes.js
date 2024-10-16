const express = require('express');
const Task =require('./tasksmodel.js')
const router = express.Router();
router.post('/',async (req,res)=>{
    try{
        const {task,status}=req.body
        const newTask=new Task({task,status})
        await newTask.save()
        const tasks= await Task.find()
        res.json(tasks)
    }
    catch (error){
        res.status(500).json([{message:"Could not add task",error}])
    }
})

router.get('/',async (req,res)=>{
    try{
        const tasks= await Task.find()
        res.json(tasks)
    }
    catch (error){
        res.status(500).json([{message:"Could not fetch tasks",error}])
    }
});

router.delete('/:id',async (req,res)=>{
    try {
        const id=req.params.id
        await Task.findByIdAndDelete(id)
        const tasks=await Task.find()
        res.json(tasks)
    } 
    catch (error) {
        res.status(500).json([{message:"Could not delete the task",error}])
    }
})

router.put('/:id',async (req,res)=>{
    try {
        const id=req.params.id
        const data=req.body
        await Task.findByIdAndUpdate(id,{task:data.updatedTask})
        const tasks=await Task.find()
        res.json(tasks)
    } 
    catch (error) {
        res.status(500).json([{message:"Could not edit the task",error}])
    }
})
router.put('/status/:id',async (req,res)=>{
    try {
        const id=req.params.id
        const data=req.body
        await Task.findByIdAndUpdate(id,{status:data.newStatus})
        const tasks=await Task.find()
        res.json(tasks)
    } 
    catch (error) {
        res.status(500).json([{message:"Could not update the task status",error}])
    }
})
module.exports=router
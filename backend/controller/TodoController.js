const express=require('express');
const app=express();
const Todo=require('../models/TodoModel');

app.use(express.json());

//create a task
const createTask=async(req,res)=>{
    try{
        const {email,task,desc,imp,status,dueDate}=req.body;
        const newTodo=Todo({email,task,desc,imp,status,dueDate});
        await newTodo.save();
        res.status(200).json({
            success:true,
            message:newTodo,
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

//get all the task
const getAllTask=async(req,res)=>{
    try{
        const allTask=await Todo.find();
        if(!allTask || allTask.length===0){
            res.json({
                message:"No such task exists",
            })
        }
        else{
            res.status(200).json({
                success:true,
                message:allTask,
            })
        }
    }catch(err){
        res.status(500).json({
            success:true,
            message:err.message,
        })
    }
}

//get a single data
const getSingleTask=async(req,res)=>{
    try{
        const {id}=req.params;
        const singleTask=await Todo.findById(id);
        if(!singleTask || singleTask.length===0){
            res.json({
                message:"No such Task schedule"
            })
        }else{
            res.status(200).json({
                success:true,
                message:singleTask
            })
        }
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

//delete a task
const deleteTask=async(req,res)=>{
    try{
        const {id}=req.params;
        const deletedTask=await Todo.findByIdAndDelete(id);
        if(!deletedTask || deletedTask.length===0){
            res.json({
                message:"No such Task exists",
            })
        }else{
            res.status(200).json({
                success:true,
                message:deletedTask,
            })
        }
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

//update a task
const updateTask=async(req,res)=>{
    try{
        const {id}=req.params;
        const {task,desc,imp,status,dueDate}=req.body;
        const updatedTask=await Todo.findByIdAndUpdate(id,{task,desc,imp,status,dueDate},{new:true});
        if(!updatedTask || updatedTask.length===0){
            res.json({
                message:"No such Task exist",
            })
        }else{
            res.status(200).json({
                success:true,
                message:updatedTask,
            })
        }
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

//display data
const DisplayData=async(req,res)=>{
    try{
        res.send(global.taskCategory);
    }
    catch(err){
        console.error({
            success:false,
            message:error.message,
        })
    }
}

module.exports={createTask,getAllTask,getSingleTask,deleteTask,updateTask,DisplayData};

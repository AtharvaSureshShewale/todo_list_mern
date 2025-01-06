const express=require('express')
const router=express.Router();
const {createTask, getAllTask, getSingleTask, deleteTask, updateTask, DisplayData} =require('../controller/TodoController');
router.use(express.json());

//create a task
router.post('/todo',createTask);

//get all the task
router.get('/todo',getAllTask);

//get a single data
router.get('/todo/:id',getSingleTask);

//delete a task
router.delete('/todo/:id',deleteTask);

//update a task put or patch
router.patch('/todo/:id',updateTask);

//display data
router.post('/taskData',DisplayData);

module.exports=router;
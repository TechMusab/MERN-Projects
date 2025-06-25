const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
// Get all todos
router.get('/',async(req,res)=>{
    const todos=await Todo.find();
    res.json(todos);
})
//Add new todo
router.post('/',async (req,res)=>{
    const {description}=req.body
    const todo=new Todo({
        description:description
    })
    await todo.save();
    res.json(todo);
})
// edit
router.put('/:id',async (req,res)=>{
    const id=req.params.id;
    const {description}=req.body;
    const todo=await Todo.findByIdAndUpdate(id,{description:description},{new:true});
    res.json(todo);
})
//delete
router.delete('/:id',async (req,res)=>{
    const id=req.params.id;
    await Todo.findByIdAndDelete(id);
    res.json({message:"Todo deleted successfully"});
})
module.exports=router
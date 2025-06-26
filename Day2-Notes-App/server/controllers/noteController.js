const User=require('../models/User')
const Note=require('../models/Note')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.getnotes=async (req,res)=>{
    try{
        const notes=await Note.find({
            user:req.userId
        })
        res.status(200).json({
            message: 'Notes retrieved successfully',
            notes: notes
        })
    }
    catch(err){
        res.status(500).json({
            message: 'Error retrieving notes',
            error: err.message
        })
    }
}
exports.addnote= async (req, res) => {
    const {title,description}=req.body
    const note=new Note({
        title:title,
        description:description,
        user:req.userId
    })
    try{
        const savedNote=await note.save()
        res.status(201).json({
            message:"Note saved successfully",
            noteId: savedNote._id
        })
    }
    catch(err){
        res.status(500).json({
            message: 'Error saving note',
            error: err.message
        })
    }
}
exports.updateNote=async (req,res)=>{
    const {id}=req.params
    const {title,description}=req.body
    try{
        const note=await Note.findById(id)
        if(!note || note.userId!==req._id){
            res.status(404).json({
                message: 'Note not found or unauthorized access',

            })
        }
        else{
            note.title=title
            note.description=description
            const updatedNote=await note.save()
            res.status(200).json({
                message: 'Note updated successfully',
                note: updatedNote
            })
        }
    }
    catch(err){
        res.status(500).json({
            message: 'Error updating note',
            error: err.message
        })
    }
}
exports.deleteNote=async (req,res)=>{
    const {id}=req.params
    try{
        const note=await Note.findById(id)
        if(!note || note.userId!==req._id){
            res.status(404).json({
                message: 'Note not found or unauthorized access',
            })
        }
        else{
            await note.remove()
            res.status(200).json({
                message: 'Note deleted successfully'
            })
        }
    }
    catch(err){
        res.status(500).json({
            message: 'Error deleting note',
            error: err.message
        })
    }
}
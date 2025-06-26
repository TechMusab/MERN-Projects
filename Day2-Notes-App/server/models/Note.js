const mongoose=require('mongoose')
const User=require('User')

const NoteSchema=new mongoose.Schema({
    title:{
            type: String,
            required: true
        },
    description:{
            type: String,
            required: true
        },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    
})
const Note=mongoose.model('Note',NoteSchema)
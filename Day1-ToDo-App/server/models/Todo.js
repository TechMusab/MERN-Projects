const { default: mongoose } = require('mongoose')
const moongoose=require('mongoose')
const TodoSchema=new moongoose.Schema({
    description:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('Todo',TodoSchema)
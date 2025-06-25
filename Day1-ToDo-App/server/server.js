const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
require("dotenv").config()
const app=express()
app.use(cors())
app.use(express.json())
const PORT=process.env.PORT || 3000
mongoose.connect(process.env.URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(
    ()=>{
        console.log("Connected to MongoDB")
    }
).catch((err)=>console.log(err))

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
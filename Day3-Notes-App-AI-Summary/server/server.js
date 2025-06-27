import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import dotenv from 'dotenv'
dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())
const PORT=process.env.PORT || 3000
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => console.log('MongoDB connected')
).catch(
    err => console.log(err)
)
app.use('/api/users',userRoute)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
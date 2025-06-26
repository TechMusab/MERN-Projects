const User=require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => 
    {
        const {username,password}=req.body
        const hashedPassword=await bcrypt.hash(password,10)
        const user =new User({
            username:username,
            password:hashedPassword
        })
        try{
            const saveUser=await user.save()
            res.status(201).json({
                message: 'User registered successfully',
                userId: saveUser._id
            })
        }
        catch(err){
            res.status(500).json({
                message: 'Error registering user',
                error: err.message
            })
        }
    }
exports.login=async (req,res)=>{
    const {username,password}=req.body
    try{
        const user=await User.findOne({username})
        if(!user){
            return res.status(404).json({
                message: 'User not found',
            })
        }
        else{
            const isValid=await bcrypt.compare(password,user.password)
            if(isValid){
                const token=jwt.sign({
                    userId:user._id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                })
                res.status(200).json({
                    message:'Login Successful',
                    token: token,
                })

                }
                
            }
        }
        catch(err){
            res.status(500).json({
                message: 'Error logging in',
                error: err.message
            })
        }
    }



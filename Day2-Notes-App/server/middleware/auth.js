const jwt=require('jsonwebtoken')
const auth=async (req,res,next)=>{
const token=req.header('Authorization')
if(!token){
    res.status(401).json({
        message: 'Access denied, no token provided'
    })
}
else{
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded){
        return res.status(401).json({
            message: 'Invalid token'
        })
    }
    req.userId=decoded.userId
    next()
}
}
module.exports=auth
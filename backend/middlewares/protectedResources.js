const jwt=require('jsonwebtoken');
const SECRET=process.env.JWT_SECRET;
const mongoose=require('mongoose');
const UserModel=mongoose.model('UserModel');
const authorization=async(req,res,next)=>{
    const authHeader=req.headers["authorization"];
    if(!authHeader){
        return res.status(400).json({message:"Unauthorized"})
    }
    const token=authHeader.replace('Bearer ',"");
    if(!token){
        return res.status(400).json({message:"Unauthorized"})
    }
    try{
        const decoded=jwt.verify(token,SECRET);
        const user=await UserModel.findById({_id:decoded._id},{password:0});
        if(!user)
            return res.status(401).json({message:"Unauthorized"});
        req.user=user;
        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({message:"Unauthorized"})
        
    }
}
const isAdmin=async(req,res,next)=>{
    try {
        const user=await UserModel.findById(req.user._id);
        if(user.isAdmin!==1){
            return res.status(401).json({message:"Unauthorized Access"})
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({message:"Error in middleware Admin"})
        
    }
}
module.exports={authorization,isAdmin};
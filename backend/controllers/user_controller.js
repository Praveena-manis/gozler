const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET;
const UserModel=require('../models/user_model');
const saltRounds=10;
const register=async(req,res)=>{
    try {
        const {name,email,password,phone,address}=req.body;
        if(!name||!email||!password||!phone||!address){
            return res.status(500).send({message:"ALL fields are mandatory"})
        }
        let user=await UserModel.findOne({email});
        if(user){
            return res.status(400).send({message:'Email Id already registered'})
        }
       
        const hashPwd=await bcrypt.hash(password,saltRounds);
        console.log(hashPwd);
        const newUser=new UserModel({name,email,password:hashPwd,phone,address});
        const resp=await newUser.save();
        res.status(201).send({message:'User Registered successfully',resp});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Internal Server Error'})
    }
}

const login=async(req,res)=>{
  try {
    const {email,password}=req.body;
    if(!email||!password)
      return res.status(400).send({message:"One or more fields are empty"});

    const user=await UserModel.findOne({email:email})
    if(!user){
      return res.status(500).send({message:"Invalid Credentials"});
    }
    const passwordMatch=await bcrypt.compare(password,user.password)
    if(passwordMatch){
      const jwtToken=jwt.sign({_id:user._id},SECRET);
      const userInfo={"_id":user._id,"name":user.name,"email":user.email,"password":user.password,"phone":user.phone,"address":user.address,"isAdmin":user.isAdmin};
      res.status(200).json({success:true,result:{token:jwtToken,user:userInfo},message:"Login Successfull"});
    }
    else{
      return res.status(401).send({success:false,message:"Invalid Credentials"})
    }
  } catch (error) {
    console.log(error);
    
  }
}

  
module.exports={register,login};
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Number,
        default:0
    },
},{timestamps:true});

const UserModel=mongoose.model('UserModel',UserSchema);

module.exports=UserModel;
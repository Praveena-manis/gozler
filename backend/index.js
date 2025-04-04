const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');

const app=express();
app.use(express.json());
app.use(cors());
app.use('/api/v1/user',require('./routes/user_routes'));
app.listen(5000,()=>{
console.log(`Server Started`)
})
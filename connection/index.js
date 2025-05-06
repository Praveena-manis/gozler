import express from 'express'
import cors from 'cors'
import { connect } from './connect.js'
import UserRouter from './routes/user.routes.js'


const app= express()
connect()
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
app.use(express.json())//JSON Parser

app.use('/api/user',UserRouter)

app.listen(5000,()=>console.log('Server Started'))
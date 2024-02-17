import express, { Express, Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route'
import authRoutes from './routes/auth.route'
import {HttpError} from 'http-errors'
import cors from 'cors'

dotenv.config()
// set up mongoose
const MONGODB_USER = process.env.MONGODB_USER || ''
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || '';
const MONGO_DB_URL = `mongodb+srv://${MONGODB_USER}:${MONGO_DB_PASSWORD}@user-service.u43f1te.mongodb.net/user-service?retryWrites=true&w=majority`
const config = {
    mongo : {
        url : MONGO_DB_URL,
    },
    
}

// connect to mongoose
mongoose.connect(config.mongo.url)
.then(()=>{
    console.log("Connected to MongoDB on port " + mongoose.connection.port)
})
.catch((err)=>{
    console.log("Failed to connect to connect to connect_cause: "+err)
})

// using dependency
const app: Express = express()
app.use(express.json())
const corsOptions = {
  origin: true,
  credentials: true, 
};

app.use(cors(corsOptions))
const port: number = 3000



// route service
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

app.use((err :HttpError, req : Request, res : Response, next :NextFunction)=>{ 
  const statusCode =  err.status || 500
  const message = err.message || "internal error"
  return res.status(statusCode).json(
    {
      success : false,
      message,
      statusCode
    }
  )
})

app.listen(port, () => console.log(`Application is running on port  ${port}`))
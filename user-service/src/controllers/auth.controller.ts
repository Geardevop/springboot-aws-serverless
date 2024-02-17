import { NextFunction, Request, Response } from "express";
import User from "../model/user.model";
import brcyptjs from 'bcryptjs'
import { errorHandler } from "../utils/error";
import jwt from 'jsonwebtoken'

export const signup = async (req : Request, res : Response, next : NextFunction) =>{
    const {email , username ,password} = req.body
    if(!email && !username && !password) return  next(errorHandler(401, 'no invalid input'));
    const hashedPassword = brcyptjs.hashSync(password, 10)
    const newUser = new User({username, email, password : hashedPassword})

    try{
        await newUser.save()
        res.status(200).json({message: "Success create new user", statusCode: 200})
    }catch(err){
        next(err)
    }
    
}


export const signin = async(req : Request, res : Response, next : NextFunction) =>{
    const {email ,password} = req.body
    try{
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(401, 'user not found'));
        const validPassword = brcyptjs.compareSync(password, validUser.password)
        if(!validPassword) return  next(errorHandler(401, 'wrong credentials'));
        //creat exprise timestamp
        // Get the current time in UTC
        const currentTimeUTC = new Date();
        // Bangkok time is UTC+7, so add 7 hours to the current time
        const bangkokTimeOffset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
        const bangkokTime = new Date(currentTimeUTC.getTime() + bangkokTimeOffset);
        // Set the expiration timestamp to an hour from Bangkok's current time
        const expiresTimestamp = new Date(bangkokTime.getTime() + 3600000);
        // use user id to create jwt 
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET || 'null')
        // remove password form res
        const {password: hashedPassword, ... rest} = validUser._doc
        res
        .cookie('access_token', token, {httpOnly: true, expires : expiresTimestamp })
        .status(200)
        .json({message : rest, statusCode: 200})

    }catch(err){
        next(err)
    }
}


export const google = async (req : Request, res : Response, next : NextFunction) =>{
    try{
        console.log(req.body.email)
        const user = await User.findOne({email : req.body.email})
        // Get the current time in UTC
        const currentTimeUTC = new Date();
        // Bangkok time is UTC+7, so add 7 hours to the current time
        const bangkokTimeOffset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
        const bangkokTime = new Date(currentTimeUTC.getTime() + bangkokTimeOffset);
        // Set the expiration timestamp to an hour from Bangkok's current time
        const expiresTimestamp = new Date(bangkokTime.getTime() + 3600000);
        if(user){
    
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET || 'null')
            const {password: hashedPassword, ... rest} = user._doc
            res
            .cookie('access_token', token, {httpOnly: true, expires : expiresTimestamp })
            .status(200)
            .json({message : rest, statusCode: 200})
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = brcyptjs.hashSync(generatedPassword, 10)
            const newUser = new User(
                {
                    username : req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(), 
                    email : req.body.email, 
                    password : hashedPassword
                }
                )
            await newUser.save()
            const  token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET || 'null')
            const {password: password, ... rest} = newUser._doc
            res
            .cookie('access_token', token, {httpOnly: true, expires : expiresTimestamp })
            .status(200)
            .json({message : rest, statusCode: 200})
        }
    }
    catch(err){
        next(err)
    }
}

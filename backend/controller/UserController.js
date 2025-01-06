const express=require('express');
const app=express();
const User=require('../models/UserModel');
const {validationResult} =require('express-validator');
app.use(express.json());
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const jwtSecret=process.env.JWT_SECRET;

const CreateUser=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(500).json({
            message:errors.array()
        });
    }

    try{
        const {name,email,password}=req.body;

        const salt=await bcrypt.genSalt(10);
        const secPassword=await bcrypt.hash(password,salt);

        const newUser=User({name,email,password:secPassword});
        await newUser.save();
        res.status(200).json({
            success:true,
            message:newUser,
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

const LoginUser=async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(500).json({
            message:errors.array()
        })
    }

    try{
       const{email,password}=req.body;
        const userData=await User.findOne({email});

        if(!userData){
            return res.status(500).json({
                success:false,
                message:"Try logging with correct credentials",
            })
        }

        const pwdCompare=await bcrypt.compare(password,userData.password);
        if(!pwdCompare){
            return res.status(500).json({
                success:false,
                message:"Try logging with correct credentials",
            })
        }

        const data={
            user:{
                id:userData._id,
            }
        }

        const authToken=jwt.sign(data,jwtSecret);

        return res.status(200).json({
            success:true,
            authToken:authToken,
        })

    }catch(err){
        res.statud(500).json({
            success:false,
            message:err.message,
        })
    }
}

module.exports={CreateUser,LoginUser};
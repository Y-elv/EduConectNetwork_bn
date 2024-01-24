import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator";

const createToken=(_id, email, name)=>{
    const jwtkey=process.env.JWT_SECRET_KEY
    return jwt.sign({_id,email,name},jwtkey)
    }
    const registerUser=async(req,res)=>{
      try{
      const {name,email,password,userType} = req.body
      let registerInstance=await userModel.findOne({email})
      
      if (registerInstance)
      return res.status(400).json("user with the given email already exist ")
      
      if (!name || !email || !password || !userType)
      return res.status(400).josn("all fields are required")
    
      if(!validator.isEmail(email))
      return res.status(400).json("email must be valid email ")
    
      
      if(!validator.isStrongPassword(password))
      return res.status(400).json("password must be a strong password ")
    
    
      registerInstance=new userModel({
        name,
        email,
        password,
        userType
      
        
      })
    
      const salt=await bcrypt.genSalt(10)
      registerInstance.password=await bcrypt.hash(registerInstance.password,salt)
      await registerInstance.save() 
    
      const token =createToken(registerInstance._id, registerInstance.email, registerInstance.name)
      res.status(200).json({_id:registerInstance._id, email:registerInstance.email, name:registerInstance.name,token})
    
      }  
      catch(err){
      res.status(500).json({
        message:"failed to save the data",
        error:err
      })
      }
    
    }
    
    const loginUser=async(req,res)=>{
    const {email,password}=req.body
    try{
    let registerInstance=await userModel.findOne({email})
    if (!registerInstance) return res.status(400).json("invalid email or password ")
    const isValidPassword=await bcrypt.compare(password,registerInstance.password)
    
    if(!isValidPassword)  return res.status(400).json("invalid email or password ")
     const token =createToken(registerInstance._id, registerInstance.email, registerInstance.name)
      res.status(200).json({_id:registerInstance._id, email:registerInstance.email,name: registerInstance.name,token})
    
    }
    
    catch(error){
    console.log(error)
    res.status(500).json(error)
    }
    }
    export {registerUser,loginUser}
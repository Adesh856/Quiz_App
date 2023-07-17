const express = require("express")
const UserRouter = express.Router()
const userModel = require("../models/user.model")

UserRouter.post("/register",async(req,res)=>{
    const payload = req.body
    try {
        const Ispresent = await userModel.findOne({email:req.body.email})
        if(Ispresent){
        res.status(401).send({"msg":"User already registered"})
        }
        const newUser = new userModel(payload) 
         await newUser.save()
        res.status(200).send({"msg":"User has been register"})
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})





module.exports = UserRouter
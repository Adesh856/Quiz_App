const express = require("express")
const quizRouter = express.Router()
const Quiz = require("../models/quiz.model")
const userModel = require("../models/user.model")
///create quiz


  
quizRouter.post('/Createquiz', async (req, res) => {
    try {
      const quizData = req.body.quiz;
     
      const quiz = await Quiz.create(quizData);
      await quiz.save();
      const creator = await userModel.findOneAndUpdate({ email: quizData.creator },{ $push: { quizzes: quiz._id }});
      res.status(201).json({ quiz });
    } catch (error) {
      console.error('Failed to create quiz:', error);
      res.status(500).json({ error: error.message });
    }
  });

  
// Get all quizzes
quizRouter.get('/getallquiz', async (req, res) => {
    try {
      const quizzes = await Quiz.find();
      res.json({ quizzes });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
  });
///quizdescandtitle
quizRouter.patch("/Updatetitledesc/:quizId",async(req,res)=>{
    try {
        const quizId=req.params.quizId
        const {creator,title,description} = req.body
        const UserCheck = await userModel.findOne({email:creator})
        console.log(UserCheck)
        const flag = UserCheck.quizzes.includes(quizId);
        console.log(flag);
      if(!flag){
        return  res.status(500).json({ error: `This quiz is created by ${creator} you can not update this quiz ` });
      }
     const Updatequiz = await Quiz.findOneAndUpdate({_id:quizId},{
        title,
        description
     })
     res.status(201).json({ "msg":"Quiz title and description has been updated" ,Updatequiz});

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})

//quiz leaderboard
quizRouter.patch("/Updateleaderboard/:quizId", async (req, res) => {
    try {
      const quizId = req.params.quizId;
      const { creator, score } = req.body;
  
      const Updatequiz = await  Quiz.findOneAndUpdate({_id:quizId},{$push:{leaderboard:{email,score}}})
      res.json(Updatequiz);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  //delete 

  quizRouter.delete("/deletequiz/:quizId/:email",async(req,res)=>{
    try {
        const {quizId,email}=req.params
       
        const UserCheck = await userModel.findOne({email})
           let flag=false
        UserCheck.quizzes.forEach(element => {
            if(element===quizId){
                flag=true
                return
            }
             flag=false
             return
        });
      if(flag==false){
        return  res.status(500).json({ error: `This quiz is created by ${email} you can not update this quiz ` });
      }
     const Updatequiz = await Quiz.findOneAndDelete({_id:quizId})
     res.status(201).json({ "msg":"Quiz title and description has been deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})





module.exports = quizRouter
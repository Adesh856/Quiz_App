const express = require("express")
const app = express()
const connection =require("./db")
const UserRouter = require("./routes/user.routes")
const quizRouter = require("./routes/quiz.routes")

app.use(express.json())
app.use("/user",UserRouter)
app.use("/quiz",quizRouter)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("MongoDb is connected with Server")
    } catch (error) {
        console.log("MongoDB is not connected with Server")
    }

    console.log(`Server is listening on Port : ${process.env.port}`)
})
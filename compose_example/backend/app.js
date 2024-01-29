import dotenv from "dotenv"  // To pass and use environment variables from compose file.
dotenv.config()


//Imports
import mongoose from "mongoose"
import taskroutes from "./src/routes/taskroutes.js"
import express from "express"

// DB connection

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env['WHICH_DB'],{})
        console.log("Connected to db!")
    } catch(e){
        console.log("Server crashed!")
    }
}

await dbConnect()

const app = express()

// Parsing middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// Routes
app.use("/",taskroutes)

app.all("*", (req,res) => {
    res.status(404).send("Oops! Resource not found.")
})


app.listen(process.env['PORT'],() => {
    console.log(`Listening on ${process.env['PORT']}`)
})
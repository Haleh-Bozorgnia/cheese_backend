require("dotenv").config()
const { PORT = 4000, DATABASE_URL } = process.env;
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")

//Database


const cheeseSchema = new mongoose.Schema({
  name: String,
  countryOfOrigin: String,
  image: String,
});
const Cheese = mongoose.model("Cheese", cheeseSchema)

mongoose.connect(DATABASE_URL)

mongoose.connection
  .on("open", () => console.log("connected to database"))
  .on("close", () => console.log("disconnevted from database"))
  .on("error", (error) => console.log(error));
// Middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

//Route
//Index
app.get("/cheese", async(req,res)=> {
    try{
        const cheese = await Cheese.find({})
        res.json(cheese)

    }catch (error){
        res.status(400).json({error})
    }
})
//Create
app.post("/cheese" , async (req,res)=> {
    try{
        const cheese = await Cheese.create(req.body)
        res.json(cheese)
    } catch(error){
        res.status(400).json({error})
    }
})

//Show
app.get("/cheese/:id", async(req,res)=>{
    try{
        const cheese = await Cheese.findById(req.params.id) 
        res.json(cheese)

    }catch(erroe){
        res.status(400).json({error})
    }
})
//Update
app.put("/cheese/:id", async (req,res)=> {
    try{
        const cheese = await Cheese.findByIdAndUpdate(req.params.id)
        res.json(cheese)

    }catch(error){
        res.status(400).json({error})
    }
})
//Delete
app.delete("/cheese/:id",async(req,res)=>{
    try{
        const cheese = await Cheese.findByIdAndDelete(req.params.id)
        res.json(cheese)

    }catch(error){
        res.status(400).json({error})
    }
})

//Listener
app.listen(PORT,()=> console.log(`Listening to Port ${PORT}`))
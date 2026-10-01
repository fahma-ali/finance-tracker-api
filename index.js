import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import hetmet from "helmet";
import cors from "cors";
import morgan from "morgan";

//route
import authRoute from './routes/auth.js'
const app = express();
dotenv.config();
const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URI).then(() => console.log("mongodb connected")).catch((err) => console.log("not connected mongodb", err))

app.use(express.json());
app.use("/auth",authRoute)


app.get("/", (req, res) => {
    res.send("this is first project for node js express framework and mongodb throught mongoose")
})

app.listen(port, () => {
   console.log(`SERVER RUNNING ${port}`)
}).on("error",(error) => {
    console.log("❌ Server error:", error)
})
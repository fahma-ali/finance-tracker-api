import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

//route
import authRoute from './routes/auth.js'
import dashboardRoute from './routes/authorize.js'
import categoryRoutes from "./routes/category.js"
import transactionRoute from "./routes/transaction.js"
import uploadRoute from "./routes/upload.js"
import adminRoute from "./routes/admin.js"
//error handle
import { errorHandler } from './middleware/globalError.js'
import { notfound } from "./middleware/notfound.js";

const app = express();
dotenv.config();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"))
app.use(express.json());


const port = process.env.PORT;
morgan("dev")
mongoose.connect(process.env.MONGO_URI).then(() => console.log("mongodb connected")).catch((err) => console.log("not connected mongodb", err))

app.use("/auth",authRoute)
app.use("/dashboard", dashboardRoute)
app.use("/Category",categoryRoutes)
app.use("/Transaction", transactionRoute)
app.use("/Upload", uploadRoute)
app.use("/Admin", adminRoute)

app.use(notfound)           
app.use(errorHandler)
app.get("/", (req, res) => {
    res.send("this is first project for node js express framework and mongodb throught mongoose")
})

app.listen(port, () => {
   console.log(`SERVER RUNNING ${port}`)
}).on("error",(error) => {
    console.log("❌ Server error:", error)
})
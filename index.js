import express from "express";
import mongoose from "mongoose";
import "dotenv/config";                        // first line

import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

//route
import authRoute from './routes/auth.js'
import categoryRoutes from "./routes/category.js"
import transactionRoute from "./routes/transaction.js"
import uploadRoute from "./routes/upload.js"
import adminRoute from "./routes/admin.js"
//error handle
import { errorHandler } from './middleware/globalError.js'
import { notfound } from "./middleware/notfound.js";

//security API
import { limiter } from "./middleware/rateLimiter.js"
//swagger
import swaggerUi from "swagger-ui-express";
import {swaggerSpec} from "./utils/swagger.js";

const app = express();
app.use(helmet());
app.use(cors({
    origin: ["http://localhost:5000"],

}));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(limiter);
app.use(express.json());


const port = process.env.PORT;
mongoose.connect(process.env.NODE_ENV === "production" ? process.env.MONGO_URI_PRO : process.env.MONGO_URI_DEV).then(() => console.log("mongodb connected")).catch((err) => console.log("not connected mongodb", err))

app.use("/auth",authRoute)
app.use("/categories",categoryRoutes)
app.use("/transactions", transactionRoute)
app.use("/upload", uploadRoute)
app.use("/admin", adminRoute)

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
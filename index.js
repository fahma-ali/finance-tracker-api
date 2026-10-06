import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import authRoute from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import transactionRoute from "./routes/transaction.js";
import uploadRoute from "./routes/upload.js";
import adminRoute from "./routes/admin.js";

import { errorHandler } from "./middleware/globalError.js";
import { notfound } from "./middleware/notfound.js";
import { limiter } from "./middleware/rateLimiter.js";
import { swaggerSpec } from "./utils/swagger.js";

const app = express();
const port = process.env.PORT;

app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({ origin: ["http://localhost:5000"] }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(limiter);
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => res.send("Finance Tracker API. Docs at /docs"));
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoute);
app.use("/categories", categoryRoutes);
app.use("/transactions", transactionRoute);
app.use("/upload", uploadRoute);
app.use("/admin", adminRoute);

app.use(notfound);
app.use(errorHandler);

const mongoUri =
    process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_PRO
        : process.env.MONGO_URI_DEV;

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log("mongodb connected");
        app.listen(port, () => console.log(`SERVER RUNNING ${port}`));
    })
    .catch((err) => console.log("not connected mongodb", err));
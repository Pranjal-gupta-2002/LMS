import express from 'express';
import dotenv, { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors";

config({
    path: "./config/config.env"
});
const app = express();


//using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOption = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption));


// importing and using routes

import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import payment from "./routes/paymentRoutes.js";
import other from "./routes/otherRoutes.js";
import { ErrorMiddleware } from './middlewares/Error.js';


app.use("/api/v1",course)
app.use("/api/v1",user)
app.use("/api/v1",payment)
app.use("/api/v1",other)
app.get("/", (req, res) => {
    return res
      .json({
        message:"hii",
      });
  });

export default app;


app.use(ErrorMiddleware)
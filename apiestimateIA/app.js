import { } from "dotenv/config.js";
import express from "express";
import cors from "cors"
import router from "./src/router/estimate.routers.js"

const PORT=process.env.PORT || 8888;

const app=express();

// settings
app.set("PORT", PORT);



// middlewares
app.use(express.json());
app.use(express.text());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


// routes
app.use("/",router);

export default app;
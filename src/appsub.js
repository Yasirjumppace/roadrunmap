// Librarys
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import morganBody from "morgan-body";
import { connectDB } from "./DB/index.js";

// import path from 'path'
// import { fileURLToPath } from 'url';
// DB Connection
// import { connectDB, RunSeeder } from "./DB/index.js";
// Routes
import { VehicleRouters } from "./Router/Vehicles.js";
// Response Handler

import { ResHandler } from "./Utils/ResponseHandler/ResHandler.js";

// export const filename = fileURLToPath(import.meta.url);
// export const dirname = path.dirname(filename);

export let app = express();
import path from "path";

const API_PreFix = "/api/v1";

app.use("/public/uploads", express.static(path.join("public", "uploads")));

var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("tiny"));

morganBody(app, {
  prettify: true,
  logReqUserAgent: true,
  logReqDateTime: true,
});
// Connect To Database
connectDB();
// Running Seeder
// RunSeeder();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});
// Routes
app.use(API_PreFix, VehicleRouters);

app.use(ResHandler);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const decksRoute = require('./routes/decksRoute')
// import {decksRoute} from './routes/decksRoute'

const app = express();
app.use(cors());
app.use(express.json());

require("dotenv").config();

const dbURl = process.env.DATABASE as string;
// const dbURl = process.env.DATABASE!; // String || undefined

const port = process.env.PORT || 4000;

async function startServer() {
  try {
    const db = mongoose
      .connect(dbURl, { dbName: "Deck" })
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("Error connecting to MongoDB:", err));
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    return;
  }
  app.listen(port, () => console.log(`App is running on port ${port}`));
}

startServer();

app.use('/',decksRoute)
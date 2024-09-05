import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

const DB_URL =
  "mongodb+srv://ananyapathak190:DFjq5DQ1mA63gvC6@cluster0.290gs.mongodb.net/";

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb atlas");
  })
  .catch((err) => {
    console.log("Failed to connect", err);
  });

app.use("/api", todoRoutes);

app.get("/", (req, res) => {
  res.send("Hey, going to make a todo app!");
});

app.listen(8080, () => {
  console.log("Server running on 8080!");
});

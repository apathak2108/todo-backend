import express from "express";
import ToDo from "../models/ToDo.js";

const router = express.Router();

router.get("/todos", async (req, res) => {
  try {
    const todos = await ToDo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/todos", async (req, res) => {
  const todo = new ToDo({
    task: req.body.task,
  });
  try {
    const newTodo = todo.save();
    res.status(200).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    const todo = await ToDo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found!" });
    }
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/todos/:id', async (req, res) => {
  try {
    const todo = await ToDo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (req.body.task != null) {
      todo.task = req.body.task; 
    }

    if (req.body.completed != null) {
      todo.completed = req.body.completed;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


export default router;

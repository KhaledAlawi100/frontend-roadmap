import express from "express";
import cors from "cors";
import fs from "node:fs/promises";

const app = express();

const PORT = 3000;
const DB_FILE = "./mock-backend/db.json";

app.use(cors());
app.use(express.json());

/* =========================
   Database Helpers
   ========================= */

async function readDatabase() {
  const file = await fs.readFile(DB_FILE, "utf-8");

  return JSON.parse(file);
}

async function writeDatabase(database) {
  await fs.writeFile(DB_FILE, JSON.stringify(database, null, 2));
}

/* =========================
   GET /tasks
   ========================= */

app.get("/tasks", async (req, res) => {
  const database = await readDatabase();

  res.json({
    success: true,
    message: "Tasks retrieved successfully",
    data: database.tasks,
  });
});

/* =========================
   GET /tasks/:id
   ========================= */

app.get("/tasks/:id", async (req, res) => {
  const database = await readDatabase();

  const id = Number(req.params.id);

  const task = database.tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
      errors: {
        id: "Task does not exist",
      },
    });
  }

  res.json({
    success: true,
    message: "Task retrieved successfully",
    data: task,
  });
});

/* =========================
   POST /tasks
   ========================= */

app.post("/tasks", async (req, res) => {
  const database = await readDatabase();

  const { title, description } = req.body;

  if (!title || title.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: {
        title: "Title must contain at least 3 characters",
      },
    });
  }

  const newTask = {
    id: getNextId(database.tasks),
    title: title.trim(),
    description: description?.trim() || undefined,
    completed: false,
    status: "TODO",
  };

  database.tasks.push(newTask);

  await writeDatabase(database);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask,
  });
});

/* =========================
   PATCH /tasks/:id
   ========================= */

app.patch("/tasks/:id", async (req, res) => {
  const database = await readDatabase();

  const id = Number(req.params.id);

  const task = database.tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
      errors: {
        id: "Task does not exist",
      },
    });
  }

  const { title, description, completed, status } = req.body;

  if (title !== undefined) {
    if (title.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: {
          title: "Title must contain at least 3 characters",
        },
      });
    }

    task.title = title.trim();
  }

  if (description !== undefined) {
    task.description = description.trim();
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  if (status !== undefined) {
    task.status = status;
  }

  await writeDatabase(database);

  res.json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
});

/* =========================
   DELETE /tasks/:id
   ========================= */

app.delete("/tasks/:id", async (req, res) => {
  const database = await readDatabase();

  const id = Number(req.params.id);

  const taskIndex = database.tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
      errors: {
        id: "Task does not exist",
      },
    });
  }

  database.tasks.splice(taskIndex, 1);

  await writeDatabase(database);

  res.json({
    success: true,
    message: "Task deleted successfully",
    data: null,
  });
});

/* =========================
   Helpers
   ========================= */

function getNextId(tasks) {
  if (tasks.length === 0) {
    return 1;
  }

  return Math.max(...tasks.map((task) => task.id)) + 1;
}

/* =========================
   Start Server
   ========================= */

app.listen(PORT, () => {
  console.log(`Mock backend running at http://localhost:${PORT}`);
});

const router = require("express").Router();
const pool = require("../db");

// CREATE
router.post("/", async (req, res) => {
  try {
    const { title, description, created_at, status } = req.body;
    const newTask = await pool.query(
      "INSERT INTO task(title,description,created_at,status) VALUES($1,$2,$3,$4) RETURNING *",
      [title, description, created_at, status]
    );

    res.json(newTask.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// VIEW

router.get("/", async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM task");
    res.json(allTasks.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// GET A SINGLE TASK

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await pool.query("SELECT * FROM task WHERE task_id = $1", [
      id,
    ]);

    res.json(task.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// UPDATE A TASK

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, created_at, status } = req.body;

    const updateTask = await pool.query(
      "UPDATE task SET title=$1, description=$2, created_at=$3, status=$4 WHERE task_id=$5",
      [title, description, created_at, status, id]
    );

    res.json("Task was updated");
  } catch (error) {
    console.error(error.message);
  }
});

// DELETE A TASK

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTask = await pool.query("DELETE FROM task WHERE task_id=$1", [
      id,
    ]);

    res.json("Task was deleted");
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const taskRoute = require("./Routers/task.routes");

// middlewares
app.use(cors());
app.use(express.json());

// ROUTES //
app.use("/tasks", taskRoute);

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});

import React, { Fragment, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [created_at, setcreated_at] = useState(
    new Date().toISOString().split("T")[0]
  ); // Initialize with the current date
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setcreated_at(new Date().toISOString().split("T")[0]);
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      // validation
      if (
        title.trim() === "" ||
        description.trim() === "" ||
        created_at === "" ||
        status.trim() === ""
      ) {
        console.error("All fields are required");
        return;
      }

      const body = { title, description, created_at, status };
      const response = await fetch("http://localhost:5000/tasks/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(response);

      if (response.ok) {
        window.alert("Task created successfully!");
        navigate("/list");
      } else {
        window.alert("Failed to create task. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <Fragment>
      <div>
        <Box p={3} borderRadius={4} marginTop={2} width="80%" margin="auto">
          <Grid item xs={12} justifyContent="right" display="flex">
            <Button variant="outlined" href="/list">
              View All Tasks
            </Button>
          </Grid>
        </Box>
        <Box
          boxShadow={3}
          p={3}
          borderRadius={4}
          marginTop={2}
          width="50%"
          margin="auto"
        >
          <h1>CREATE TASK</h1>
          <form onSubmit={onSubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  fullWidth
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  //error={title.trim() === ""}
                  helperText={title.trim() === "" ? "Title is required" : ""}
                  sx={{ "& fieldset": { borderColor: "black !important" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  // error={description.trim() === ""}
                  helperText={
                    description.trim() === "" ? "Description is required" : ""
                  }
                  sx={{ "& fieldset": { borderColor: "black !important" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="date"
                  fullWidth
                  required
                  value={created_at}
                  onChange={(e) => setcreated_at(e.target.value)}
                  error={created_at === ""}
                  helperText={created_at === "" ? "Date is required" : ""}
                  sx={{ "& fieldset": { borderColor: "black !important" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status *</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    sx={{ "& fieldset": { borderColor: "black !important" } }}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="To Do">To Do</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} justifyContent="center" display="flex">
                <Button variant="contained" color="primary" type="submit">
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </Fragment>
  );
}

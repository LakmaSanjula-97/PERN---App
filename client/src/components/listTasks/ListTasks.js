import React, { Fragment, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

import EditTask from "../editTask/EditTask";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ListTasks() {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks/");
      const jsonData = await response.json();

      setTasks(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const deleteTask = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task.task_id !== id));
      console.log(deleteTask);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Fragment>
      <Box
        boxShadow={3}
        p={3}
        borderRadius={4}
        marginTop={2}
        width="90%"
        margin="auto"
      >
        <Grid item xs={12} justifyContent="right" display="flex">
          <Button variant="outlined" href="/">
            CREATE TASK
          </Button>
        </Grid>
        <h1>LIST OF TASKS</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Title</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Created Date</StyledTableCell>
                <StyledTableCell align="right">Ststus</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <StyledTableRow key={task.task_id}>
                  <StyledTableCell component="th" scope="row">
                    {task.title}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {task.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {new Date(task.cretaed_at).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">{task.status}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button>
                      <EditTask task={task} />
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => deleteTask(task.task_id)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Fragment>
  );
}

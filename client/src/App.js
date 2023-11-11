import React, { Fragment } from "react";
import AddTask from "./components/addTask/AddTask";
import ListTasks from "./components/listTasks/ListTasks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Fragment>
        <div className="container">
          <Routes>
            <Route path="/" element={<AddTask />} />
            <Route path="/list" element={<ListTasks />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;

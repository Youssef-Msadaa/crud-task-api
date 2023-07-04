const express = require("express");

const cors = require("cors");
const app = express();
const mongoose = require("./database/connect");

const TaskList = require("./database/models/taskList");
const Task = require("./database/models/task");
app.use(cors());
//example of middleware
app.use(express.json()); //body parser

//Routes or Rest Api Endpoints
/* 
TaskList -Crud Operations
Task -Crud Operations
*/

app.get("/TaskLists", (req, res) => {
  TaskList.find({})
    .then((foundTask) => {
      res.status(200).send(foundTask);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get("/getbyid/:id", (req, res) => {
  let id = req.params.id;
  TaskList.findById({ _id: id })
    .then((foundTask) => {
      res.status(200).send(foundTask);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/createTask", (req, res) => {
  let data = req.body;
  taskList = new TaskList(data);
  taskList
    .save()
    .then((createdTask) => {
      res.status(201).send(createdTask);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.put("/update/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body;
  TaskList.findByIdAndUpdate({ _id: id }, data)
    .then((updatedTask) => {
      res.status(201).send(updatedTask);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.delete("/del/:id", (req, res) => {
  let id = req.params.id;
  TaskList.findByIdAndDelete({ _id: id })
    .then((deletedTask) => {
      res.status(201).send(deletedTask);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
app.listen(3000, () => {
  console.log("server starter on port 3000");
});

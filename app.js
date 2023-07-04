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

// Crud Operations for task

app.get("/tasklists/:listtaskid/tasks/:taskid", (req, res) => {
  let listtaskid = req.params.listtaskid;

  Task.find({
    _tasklistId: listtaskid,
    _id: req.params.taskid,
  })
    .then((foundTask) => {
      res.status(200).send(foundTask);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
app.get("/tasklists/:listtaskid/tasks", (req, res) => {
  let listtaskid = req.params.listtaskid;

  Task.find({ _tasklistId: listtaskid })
    .then((foundTask) => {
      res.status(200).send(foundTask);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/create/:tasklistid/tasks", (req, res) => {
  let data = req.body;
  data._tasklistId = req.params.tasklistid;
  task = new Task(data);
  task
    .save()
    .then((createdTask) => {
      res.status(201).send(createdTask);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.put("/updateTask/:tasklistid/tasks/:taskId", (req, res) => {
  let data = req.body;
  Task.findByIdAndUpdate(
    {
      _tasklistId: req.params.tasklistid,
      _id: req.params.taskId,
    },
    data
  )
    .then((updatedTask) => {
      res.status(201).send(updatedTask);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.delete("/delTask/:tasklistid/tasks/:taskId", (req, res) => {
  Task.findByIdAndDelete({
    _tasklistId: req.params.tasklistid,
    _id: req.params.taskId,
  })
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

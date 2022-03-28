const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });

  // Few response options
  // res.status(200).json({ tasks, amount: tasks.length });
  // res.status(200).json({ success: true, data:{tasks, nbHits:tasks.length} });
  // res.status(200).json({ status: success, data:{tasks, nbHits:tasks.length} });
});

const createTask = asyncWrapper(async (req, res) => {
  // Manage our model level validtion errors 1 avoid hanging 2 get response
  const task = await Task.create(req.body);
  res.status(200).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    /*
    // Our own custom error instead of from the models
    const error = new Error("Not Found");
    error.status = 404;
    return next(error); // pass on to our error-handler middleware
    */

    return next(createCustomError(`No task with id: ${taskID}`, 404));

    /*
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });
    */
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  res.status(200).json({ task });
  // res.status(200).send(); // functionality will still work
  // res.status(200).json({ task: null, status: "success" }); // another possiblity
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  // IMPROTANT 1 without options we get back by default the original task that we wanted to updated 2 we are not running basic model validation
  // const task = await Task.findOneAndUpdate({ _id: taskID }, req.body);

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }

  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};

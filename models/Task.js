const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxLength: [20, "name cannot be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);

/*
Mongoose Schema defines the structure for the document that includes types, validation, etc.
Mongoose Model provides an interface to the database. By using the model we will be able to create, 
update, query, and delete our document with great ease via this Mongoose API.
*/

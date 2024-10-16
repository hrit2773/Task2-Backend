const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true, unique:true },
  status:{type: String,required:true}
});

const tasks = mongoose.model('Tasks', taskSchema);

module.exports = tasks;
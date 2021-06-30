const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  email: { type: String, required: 'Email address is required' },
  title: { type: String, required: true },
  completed: { type: Boolean, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model('Todo', TodoSchema);

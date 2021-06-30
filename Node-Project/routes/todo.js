const router = require('express').Router();
const Todo = require('../models/Todo');
const { authenticate } = require('../middleware/authenticate');

router.get('/todos', authenticate, async (req, res, next) => {
  const email = req.headers.email;
  try {
    const allTodos = await Todo.find({ email }).select('title completed date');
    res.send({
      success: true,
      todos: allTodos,
    });
  } catch (error) {
    res.status(400).send({
      succss: false,
      message: 'Can not fetch todos at the moment.',
    });
  }
});

router.get('/todos/:id', authenticate, async (req, res) => {
  const email = req.headers.email;
  const _id = req.params.id;
  try {
    const todo = await Todo.find({ email, _id }).select('title completed date');
    res.send({
      success: true,
      todos: todo,
    });
  } catch (error) {
    res.status(400).send({
      succss: false,
      message: 'Requested todo does not exist',
    });
  }
});

router.post('/todo', authenticate, async (req, res) => {
  const { title, date } = req.body;
  const email = req.headers.email;
  if (!title || !email) {
    const message = !title
      ? 'Please provide title'
      : 'Please set email in request header';
    return res.status(400).send({
      error: true,
      message,
    });
  }

  const todoObj = {
    email,
    title,
    completed: false,
    date: date ? date : new Date().toLocaleDateString(),
  };

  try {
    const newTodo = new Todo(todoObj);
    const response = await newTodo.save();
    return res.send({ message: 'Todo added successfully', todo: response });
  } catch (error) {
    return res.status(400).send({
      message: 'Error occured during crating this todo',
      error,
    });
  }
});

router.post('/todos/:id', authenticate, async (req, res) => {
  const email = req.headers.email;
  const _id = req.params.id;

  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).send({
      success: false,
      message: 'Please provide data to be udpated',
    });
  }

  try {
    await Todo.find({ _id, email }).updateOne(data);
    return res.send({
      success: true,
      message: 'Todo updated successfully',
    });
  } catch (error) {
    res.status(400).send({
      succss: false,
      message: 'Can not update todo at the moment.',
      error,
    });
  }
});

router.delete('/todos/:id', authenticate, async (req, res) => {
  const email = req.headers.email;
  const _id = req.params.id;

  try {
    const response = await Todo.deleteOne({ _id, email });
    return res.send({
      success: true,
      message: 'Todo deleted successfully',
      data: response,
    });
  } catch (error) {
    res.status(400).send({
      succss: false,
      message: 'Can not delete todo at the moment.',
      error,
    });
  }
});

module.exports = router;

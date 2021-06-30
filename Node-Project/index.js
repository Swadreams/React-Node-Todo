require('dotenv').config();
const express = require('express');
const connectDB = require('./DB/Connection');
const { json } = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(json());

connectDB();

app.use('/', todoRoutes);
app.use('/user', authRoutes);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

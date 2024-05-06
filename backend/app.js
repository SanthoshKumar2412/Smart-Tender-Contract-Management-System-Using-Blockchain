const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
connectDB();
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

module.exports = app;

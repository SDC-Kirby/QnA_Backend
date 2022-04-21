const express = require('express');
const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/questions', indexRouter);

module.exports = app;

module.exports = app;

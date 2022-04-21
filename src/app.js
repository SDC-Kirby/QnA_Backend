var express = require('express');
var indexRouter = require('./routes/index');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/questions', indexRouter);

module.exports = app;

module.exports = app;

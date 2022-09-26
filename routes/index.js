const express = require("express");
const app = express();

const genre = require("./genre");
const book = require("./book");
const user = require("./user");
const response = require("./response")
const anketa = require('./anketa')
const booking = require("./booking");

const { isAuth, isAdmin, isModer } = require("../middlewares/auth")

app.use('/genre', genre);
app.use('/book', book);
app.use('/user', user);
app.use('/response', response);
app.use('/anketa', anketa);
app.use("/booking", booking);

module.exports = app;
const express = require("express");
const app = express();

const genre = require("./genre");
const book = require("./book");
const user = require("./user");

const { isAuth, isAdmin, isModer } = require("../middlewares/auth")

app.use('/genre', genre);
app.use('/book', book);
app.use('/user', user);

module.exports = app;
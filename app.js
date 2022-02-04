var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bearerToken = require('express-bearer-token');
const mongoose = require('mongoose');
require('dotenv').config();
const { DB_URL, SEC_KEY } = process.env;
const auth = require("./app/middlewares/auth");

//Set up default mongoose connection
var mongoDB = DB_URL;
mongoose.connect( mongoDB, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
} );
//Get the default connection
const db = mongoose.connection;

var usersRouter = require('./app/routes/users');
var authRouter = require('./app/routes/auth');

var app = express();
app.use(bearerToken());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const apiEndPoint = "/api/v1";

app.use(apiEndPoint+'/', authRouter);
app.use(apiEndPoint+'/users', auth.verifyLogin, usersRouter);

module.exports = app;

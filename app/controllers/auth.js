const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SEC_KEY } = process.env;
const authService = require('../services/auth')

let responseObj = {
  status: false,
  data: []
}

const loginAction = async (req, res, next) => {

  responseObj.data = [];
  responseObj.status = false;
  
  const result = await authService.getAuth( req.body.user_name, req.body.password );

  if( !result ) {
    responseObj.data = [];
    responseObj.status = false;
    responseObj.data.push({
      msg: 'user not found'
    })
    res.status(404);
    res.send(responseObj);
    return;
  }

  const token = await jwt.sign({
    userId: result.id
  },
  SEC_KEY,
  {
      expiresIn: '1h'
  });

  responseObj.data = [];
  responseObj.status = true;
  responseObj.data = [{
    token: token
  }];
  res.send(responseObj);
  return;    
}

const registrationAction = async (req, res, next) => {

  const result = await authService.createAuth( req.body.user_name, req.body.password );

  if( !result ) {
    responseObj.data = [];
    responseObj.status = false;
    responseObj.data = [{
      msg: 'user is not registerd! please try again'
    }]
    res.status(400);
    res.send(responseObj);
    return;
  }

  responseObj.data = [];
  responseObj.status = true;
  responseObj.data = [{
    msg: 'registration success, admin will review and approve your account'
  }];

  res.send(responseObj);
}

const authValidationCheck = (req, res, next) => {
  responseObj.data = [];
  responseObj.status = false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    responseObj.data = [];
    errors.errors.forEach(error => {
        responseObj.data.push(error);
    });
    res.status(400);
    res.send(responseObj);
    return;
  }
  next();
}


module.exports.loginAction = loginAction;
module.exports.registrationAction = registrationAction;
module.exports.authValidationCheck = authValidationCheck;
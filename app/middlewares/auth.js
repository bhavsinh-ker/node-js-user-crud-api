const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SEC_KEY } = process.env;

const verifyLogin = async (req, res, next) => {
    let responseObj = {
        status: false,
        data: [{
            msg: "token is not valid"
        }]
    }

    const token = req.token;

    if( !token || token == "" ) {
        responseObj.data = [{
            msg: "token is not avaliable"
        }]
        res.status(401)
        res.send(responseObj);
        return;
    }

    try {
        const tokenData = await jwt.verify(token, SEC_KEY);
        if( !tokenData.userId ) {
            res.status(401)
            res.send(responseObj);
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(401)
        res.send(responseObj);
        return;
    }
    next();
  }

  module.exports.verifyLogin = verifyLogin;
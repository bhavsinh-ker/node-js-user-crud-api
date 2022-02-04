const { validationResult } = require('express-validator');
const validationProcess = async (req, res, next) => {
    let responseObj = {
        status: false,
        data: []
    }
        
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        responseObj.data = errors;
        res.status(400);
        res.send(responseObj);
        return;
    }
    next();
}
module.exports.validationProcess = validationProcess;
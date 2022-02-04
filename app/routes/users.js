var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const usersController = require("../controllers/users");
const validation = require("../middlewares/validation");

/* GET users listing. */
router.get('/', usersController.listUsers);

router.post('/', 
body('first_name').not().isEmpty().withMessage('First name is require').bail().trim().escape(),
body('last_name').not().isEmpty().withMessage('Last name is require').bail().trim().escape(),
body('email').not().isEmpty().withMessage('Email is require').bail().trim().escape().isEmail().withMessage('Email is not valid'),
body('user_status').isBoolean().withMessage('Status is not valid').bail().trim().escape(),
body('age').trim().escape(),
body('phone_number').trim().escape(),
body('address').trim().escape(),
validation.validationProcess,
usersController.createUser);

router.put('/',
body('id').not().isEmpty().withMessage('User ID is require').bail().trim().escape(),
body('first_name').not().isEmpty().bail().trim().escape(),
body('last_name').isEmpty().bail().trim().escape(),
body('email').isEmpty().bail().trim().escape(),
body('user_status').isEmpty().bail().trim().escape(),
body('age').isEmpty().bail().trim().escape(),
body('phone_number').isEmpty().bail().trim().escape(),
body('address').isEmpty().bail().trim().escape(),
validation.validationProcess,
usersController.updateUser);

router.delete('/',
body('id').not().isEmpty().withMessage('User ID is require').bail().trim().escape(),
validation.validationProcess,
usersController.deleteUser);

module.exports = router;

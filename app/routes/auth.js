var express = require('express');
var router = express.Router();
const { body } = require('express-validator'); 
const authController = require('../controllers/auth');

router.get('/', function(req, res, next) {
  res.send('This is API project, please login first.');
});

/* login. */
router.post('/', 
body('user_name').not().isEmpty().withMessage('Username is require').trim().escape(),
body('password').not().isEmpty().withMessage('Password is require').trim().escape(),
authController.authValidationCheck,
authController.loginAction);

/* registration. */
router.post('/registration',
body('user_name').not().isEmpty().withMessage('Username is require').trim().escape(),
body('password').not().isEmpty().withMessage('Password is require').trim().escape(),
authController.authValidationCheck,
authController.registrationAction);

module.exports = router;

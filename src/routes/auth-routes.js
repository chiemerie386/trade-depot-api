const express = require('express');
const router = express.Router();
const AuthControllers = require ('../controllers/auth-controllers')

/* GET home page. */
router.post('/register', AuthControllers.register);
router.post('/login', AuthControllers.login);

module.exports = router;

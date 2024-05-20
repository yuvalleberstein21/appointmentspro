const express = require('express');
const authRoutes = express.Router();
const { login, register } = require('../Controllers/AuthController');



authRoutes.post('/login', login);
authRoutes.post('/', register);


module.exports = authRoutes;
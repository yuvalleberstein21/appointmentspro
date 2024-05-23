const express = require('express');
const createBusiness = require('../Controllers/BusinessController');
const authenticate = require('../utils/authenticationMiddleware');
const businessRoutes = express.Router();


businessRoutes.post('/createbusiness', authenticate, createBusiness);

module.exports = businessRoutes;
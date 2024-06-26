const express = require('express');
const { createBusiness, getBusiness, getAllBusinesses, updateBusiness, getUserBusinesses, deleteBusiness } = require('../Controllers/BusinessController');
const authenticate = require('../utils/authenticationMiddleware');
const businessRoutes = express.Router();

businessRoutes.get('/', getAllBusinesses);
businessRoutes.post('/createbusiness', authenticate, createBusiness);
businessRoutes.get('/mybusiness', authenticate, getUserBusinesses);
businessRoutes.get('/:id', getBusiness);
businessRoutes.put('/updatebusiness/:id', authenticate, updateBusiness);
businessRoutes.delete('/:id', authenticate, deleteBusiness);



module.exports = businessRoutes;
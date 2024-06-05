const express = require('express');
const { createAppointment } = require('../Controllers/AppointmentController');
const authenticate = require('../utils/authenticationMiddleware');
const appointmentRoutes = express.Router();



appointmentRoutes.post('/createappointment', authenticate, createAppointment);

module.exports = appointmentRoutes;
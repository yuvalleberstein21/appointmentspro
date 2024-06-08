const express = require('express');
const { createAppointment, getBusinessAppointment } = require('../Controllers/AppointmentController');
const authenticate = require('../utils/authenticationMiddleware');
const appointmentRoutes = express.Router();



appointmentRoutes.post('/createappointment', authenticate, createAppointment);
appointmentRoutes.get('/businessAppointment/:id', getBusinessAppointment);

module.exports = appointmentRoutes;
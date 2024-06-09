const express = require('express');
const { createAppointment, getBusinessAppointment, getUserAppointment } = require('../Controllers/AppointmentController');
const authenticate = require('../utils/authenticationMiddleware');
const appointmentRoutes = express.Router();



appointmentRoutes.post('/createappointment', authenticate, createAppointment);
appointmentRoutes.get('/businessAppointment/:id', getBusinessAppointment);
appointmentRoutes.get('/userAppointment', authenticate, getUserAppointment);

module.exports = appointmentRoutes;
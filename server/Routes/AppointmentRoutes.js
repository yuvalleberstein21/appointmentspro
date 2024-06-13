const express = require('express');
const { createAppointment, getBusinessAppointment, getUserAppointment, deleteAppointment, dashboardAppointments } = require('../Controllers/AppointmentController');
const authenticate = require('../utils/authenticationMiddleware');
const appointmentRoutes = express.Router();



appointmentRoutes.post('/createappointment', authenticate, createAppointment);
appointmentRoutes.get('/businessAppointment/:id', getBusinessAppointment);
appointmentRoutes.get('/userAppointment', authenticate, getUserAppointment);
appointmentRoutes.delete('/userAppointment/:id', authenticate, deleteAppointment);
appointmentRoutes.get('/dashboardAppointments/:businessId', authenticate, dashboardAppointments);

module.exports = appointmentRoutes;
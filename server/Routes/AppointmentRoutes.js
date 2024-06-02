const express = require('express');
const { createAppointment } = require('../Controllers/AppointmentController');
const appointmentRoutes = express.Router();



appointmentRoutes.post('/createappointment', createAppointment);

module.exports = appointmentRoutes;
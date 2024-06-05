const Appointment = require("../models/appointmentModel");
const Business = require("../models/businessModel");
const Service = require("../models/serviceModel");
const User = require("../models/userModel");

const createAppointment = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { businessId, serviceId, appointmentDate, appointmentTime } = req.body;


        console.log(user._id);
        console.log(businessId);
        console.log(serviceId);
        console.log(appointmentDate);
        console.log(appointmentTime);
        // Validate input data
        if (!businessId || !serviceId || !appointmentDate || !appointmentTime) {
            return res.status(400).json({ error: 'All fields are required' });
        }


        // Check if the business exists
        const business = await Business.findById(businessId);
        if (!business) {
            return res.status(404).json({ error: 'Business not found' });
        }

        // Check if the service exists
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        // Create the appointment
        const appointment = new Appointment({
            user: userId,
            business: businessId,
            service: serviceId,
            appointmentDate: new Date(appointmentDate),
            appointmentTime: appointmentTime,
        });

        // Save the appointment to the database
        await appointment.save();

        // Return the created appointment
        return res.status(201).json(appointment);


    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the business' });
    }
};

module.exports = { createAppointment };
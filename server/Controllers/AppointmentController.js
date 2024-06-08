const Appointment = require("../models/appointmentModel");
const Business = require("../models/businessModel");
const Service = require("../models/serviceModel");
const User = require("../models/userModel");

const createAppointment = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { business, service, appointmentDate, appointmentTime } = req.body;


        // Validate input data
        if (!business || !service || !appointmentDate || !appointmentTime) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the business exists
        const businessEntity = await Business.findById(business);
        if (!businessEntity) {
            return res.status(404).json({ error: 'Business not found' });
        }

        // Check if the service exists
        const serviceEntity = await Service.findById(service);
        if (!serviceEntity) {
            return res.status(404).json({ error: 'Service not found' });
        }

        // Create the appointment
        const appointment = new Appointment({
            user: userId,
            business: business,
            service: service,
            appointmentDate: new Date(appointmentDate),
            appointmentTime: appointmentTime,
        });

        // Save the appointment to the database
        await appointment.save();

        // Return the created appointment
        return res.status(201).json(appointment);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the appointment' });
    }
};

const getBusinessAppointment = async (req, res) => {
    try {
        const businessId = req.params.id;



        const appointments = await Appointment.find({ business: businessId })

        if (appointments.length > 0) {
            res.json(appointments);
        } else {
            res.status(404).json({ error: 'No appointments found for this business' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the appointment' });
    }
};

module.exports = { createAppointment, getBusinessAppointment };
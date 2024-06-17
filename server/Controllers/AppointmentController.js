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

const getUserAppointment = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { businessId } = req.query;
        const query = { user: userId };
        if (businessId) {
            query.business = businessId;
        }

        const appointments = await Appointment.find(query)
            .populate('business')
            .populate('service');


        if (appointments.length === 0) {
            return res.status(200).json({ message: 'No appointments found', appointments: [] });
        }

        return res.status(200).json(appointments);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the appointment' });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const appointmentId = req.params.id;
        const appointment = await Appointment.findOneAndDelete({ _id: appointmentId, user: userId });
        if (appointment) {
            res.status(200).send('Appointment deleted successfully')
        } else {
            res.status(404).send('Appointment not found');
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the appointment' });
    }
};

const dashboardAppointments = async (req, res) => {
    const userId = req.user._id;
    const businessId = req.params.businessId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the business by ID
        const business = await Business.findById(businessId);
        if (!business) {
            return res.status(404).json({ error: 'Business not found' });
        }

        // Check if the user is the owner of the business
        if (String(business.owner) !== String(userId)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        // Find the appointments for the specified business
        const appointments = await Appointment.find({ business: businessId })
            .populate('user', 'name phoneNumber')
            .populate('business', 'name')
            .populate('service', 'name');

        if (appointments.length === 0) {
            return res.status(200).json({ message: 'No appointments found', appointments: [] });
        }

        return res.status(200).json(appointments);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the appointment' });
    }
};

const confirmAppointment = async (req, res) => {
    const userId = req.user._id;
    const appointmentId = req.params.appointmentId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Update confirmation status
        appointment.confirmed = true;
        await appointment.save();

        return res.status(200).json({ message: 'Appointment confirmed successfully', appointment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while confirming the appointment' });
    }
};

const updateAppointment = async (req, res) => {
    const userId = req.user._id;
    const appointmentId = req.params.appointmentId;
    const { date, time } = req.body;

    try {
        // Validate user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the appointment
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        // Check if the user is the owner of the business
        if (String(appointment.user) !== String(userId)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        // Update the appointment's date and time
        appointment.appointmentDate = new Date(date);
        appointment.appointmentTime = time;

        // Save the updated appointment
        const updatedAppointment = await appointment.save();

        // Respond with the updated appointment
        res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ error: 'Server error' });
    }


};




module.exports = {
    createAppointment,
    getBusinessAppointment,
    getUserAppointment,
    deleteAppointment,
    dashboardAppointments,
    confirmAppointment,
    updateAppointment
};
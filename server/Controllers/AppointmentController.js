const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

const createAppointment = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { name, city, address, services, workingDays, startHour, endHour, images } = req.body;


        const appointment = new Appointment({
            user: user._id,
            business: business._id,
        });

        await business.save();

        const serviceIds = [];
        for (let serviceData of services) {
            const service = new Service({
                ...serviceData,
                business: business._id
            });
            await service.save();
            serviceIds.push(service._id);
        }

        business.services = serviceIds;
        await business.save();

        user.businesses.push(business._id);
        await User.findByIdAndUpdate(req.user._id, { role: 'manager' });
        await user.save();

        return res.status(201).json(business);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the business' });
    }
};

module.exports = { createAppointment };
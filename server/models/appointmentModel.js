const mongoose = require('mongoose');


const appointmentSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    business: { type: mongoose.Types.ObjectId, ref: 'Business', required: true },
    service: { type: mongoose.Types.ObjectId, ref: 'Service', required: true },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true }, // e.g., "10:00"
    confirmed: { type: Boolean, default: false },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
const { default: mongoose } = require("mongoose");

const appointmentSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    business: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true } // e.g., "10:00"
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
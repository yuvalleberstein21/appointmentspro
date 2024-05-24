const mongoose = require('mongoose');

const businessSchema = mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    services: [{ type: mongoose.Types.ObjectId, ref: 'Service' }],
    workingDays: [{
        day: { type: String, required: true },
        startHour: { type: String, required: true },
        endHour: { type: String, required: true }
    }],
    images: [String],
    owner: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});

const Business = mongoose.model('Business', businessSchema);
module.exports = Business;
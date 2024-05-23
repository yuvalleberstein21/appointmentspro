const mongoose = require('mongoose');

const businessSchema = mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    workingDays: [{ type: String, required: true }], // e.g., ["Monday", "Tuesday"]
    startHour: { type: String, required: true }, // e.g., "09:00"
    endHour: { type: String, required: true }, // e.g., "17:00"
    images: [String], // Array of image URLs or file paths
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Business = mongoose.model('Business', businessSchema);
module.exports = Business;
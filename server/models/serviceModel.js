const mongoose = require('mongoose');
const Business = require('../models/businessModel');


const serviceSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    serviceTime: { type: Number, required: true }, // Duration in minutes
    business: { type: mongoose.Types.ObjectId, ref: 'Business', required: true }
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
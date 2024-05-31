const { default: mongoose } = require("mongoose");
const Business = require("../models/businessModel");
const Service = require('../models/serviceModel');
const User = require("../models/userModel");
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find().populate('services');
        return res.status(200).json(businesses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the businesses' });
    }
};

const createBusiness = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId);
        let uploadedImages = [];

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Process images
        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const bucketName = process.env.BUCKET_NAME;
                const newFileNameKey = `images/${file.originalname}`;
                const fileStream = fs.createReadStream(file.path);

                const params = {
                    Bucket: bucketName,
                    Key: newFileNameKey,
                    Body: fileStream
                };

                const data = await s3.upload(params).promise();
                uploadedImages.push(data.Location);

                // Remove file from server after uploading
                fs.unlinkSync(file.path);
            }
        }

        const { name, city, address, services, workingDays, startHour, endHour } = req.body;

        const business = new Business({
            name,
            city,
            address,
            workingDays,
            startHour,
            endHour,
            images: uploadedImages,
            owner: user._id
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

const getBusiness = async (req, res) => {
    try {
        const businessId = req.params.id;
        const business = await Business.findById(businessId).populate('services');

        if (!business) {
            return res.status(404).json({ error: 'Business not found' });
        }

        return res.status(200).json(business);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the business data' });
    }
};


const updateBusiness = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const business = await Business.findById(id).session(session);

        if (!business) {
            return res.status(404).send({ message: 'Business not found' });
        }

        // Update business fields except for services
        const { services, ...businessUpdates } = updates;
        Object.assign(business, businessUpdates);
        await business.save({ session });

        // Update services if provided
        if (services) {
            const serviceIds = [];
            for (const serviceData of services) {
                if (serviceData._id) {
                    // Update existing service
                    const updatedService = await Service.findByIdAndUpdate(serviceData._id, serviceData, { new: true, session });
                    serviceIds.push(updatedService._id);
                } else {
                    // Create new service
                    const newService = new Service({ ...serviceData, business: business._id });
                    await newService.save({ session });
                    serviceIds.push(newService._id);
                }
            }
            business.services = serviceIds;
        }

        await business.save({ session });
        await session.commitTransaction();

        res.status(200).send(business);
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        res.status(400).send({ message: 'Error updating business', error });
    } finally {
        session.endSession();
    }
};

const getUserBusinesses = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(404).json({ error: 'User not found' });
        }
        const businesses = await Business.find({ owner: userId }).populate('services');
        res.json(businesses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllBusinesses,
    createBusiness,
    getBusiness,
    updateBusiness,
    getUserBusinesses
};
const Business = require("../models/businessModel");
const User = require("../models/userModel");



const createBusiness = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const businessData = req.body;

        const business = new Business({
            ...businessData,
            owner: user._id
        });
        await business.save();
        user.businesses.push(business._id);
        await user.save();

        return res.status(201).json(business);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the business' });
    }
};

module.exports = createBusiness
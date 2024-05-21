const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');


// LOGIN ROUTE

const login = async (req, res) => {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        return res.status(401).send({ message: 'מספר פלאפון או סיסמא שגויים' });
    }
};


// SIGN UP ROUTE

const register = async (req, res) => {
    const { name, phoneNumber, password } = req.body;
    const userExists = await User.findOne({ phoneNumber });

    if (userExists) {
        return res.status(401).send({ message: 'User already exists' });
    }
    const user = await User.create({
        name,
        phoneNumber,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            token: generateToken(user._id),
        });
    } else {
        return res.status(400).send({ message: 'Invalid user data' });
    }
};

module.exports = {
    login,
    register
};
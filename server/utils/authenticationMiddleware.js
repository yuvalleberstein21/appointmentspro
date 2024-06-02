const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path according to your project structure

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ message: 'Access Denied: No Token Provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret key
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).send({ message: 'Access Denied: User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Access Denied: Invalid Token ' });
    }
};

module.exports = authenticate;
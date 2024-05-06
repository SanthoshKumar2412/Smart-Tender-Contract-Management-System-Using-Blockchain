const User = require('../models/User');

exports.registerUser = async (req, res) => {
    try {
        // Create a new user instance with data from the request body
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            mobileNo: req.body.mobileNo,
            dob: req.body.dob,
            companyName: req.body.companyName,
            address: req.body.address,
            password: req.body.password,
            idProof: req.body.idProof,
            signature: req.body.signature,
            uniqueId: req.body.uniqueId
        });
        
        // Save the user to the database
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


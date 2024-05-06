const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    accountId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    mobileNo: { type: String, required: true },
    dob: { type: String, required: true },
    companyName: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    idProof: { type: String, required: true }, // Store the file path or ID proof details
    signature: { type: String, required: true }, // Store the MetaMask signature
    uniqueId: { type: String, required: true } // Store the unique ID
});

module.exports = mongoose.model('User', userSchema);


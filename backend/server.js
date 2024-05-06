const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const Web3 = require('web3'); // Import Web3
const app = express();
const fs = require('fs');
const contractAbi = require('./build/contracts/TenderManagement.json').abi;
app.use(express.json());
const port = 3000;
const crypto = require('crypto');
// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/tenderManagementSystem', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Initialize express-session middleware
const secret = crypto.randomBytes(64).toString('hex');
app.use(session({
    secret: secret, // Change this to a secure random string
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to true if using HTTPS
  }));

// Define a schema for admin login
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    metaMaskAccount: { type: String }
  });
const User = mongoose.model('User', userSchema);

const vendorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  mobileNo: { type: String, required: true },
  dob: { type: Date, required: true },
  companyName: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  vendorId: { type: String, required: true, unique: true }
});

const Vendor = mongoose.model('Vendor', vendorSchema);
let a;
// Endpoint to handle login
app.post('/login', async (req, res) => {
  const { email, password, account } = req.body;
  try {
      let role = '';
      const admin = await User.findOne({ email, password }).exec();
      if (admin) {
        role = 'admin';
        req.session.userId = admin.metaMaskAccount; // Store user ID in session
        console.log(req.session.userId );
        res.json({ message: 'Admin login successful', role: 'admin' });
      } else {
        const vendor = await Vendor.findOne({ email, password }).exec();
        if (vendor) {
          role = 'user';
          req.session.vendorId = vendor.vendorId; // Store user ID in session
          console.log(req.session.vendorId );
          a=req.session.vendorId;
          console.log(a);
          res.json({ message: 'Vendor login successful', role: 'user' });
        }
        else {
          res.sendStatus(401); // Unauthorized
        }
      }
     
  } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'An error occurred during login' });
  }
});

console.log(a);
app.post('/register', async (req, res) => {
  try {
    const { vendorId, ...vendorData } = req.body;
    const existingVendor = await Vendor.findOne({ vendorId });
    if (existingVendor) {
      return res.status(400).json({ error: 'Vendor ID already exists' });
    }
    const vendor = new Vendor({ ...vendorData, vendorId });
    await vendor.save();
    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering vendor:', error);
    res.status(500).json({ error: 'Failed to register vendor' });
  }
});

// Assuming you have a Vendor model defined already
app.get('/vendors', async (req, res) => {
  try {
    const vendors = await Vendor.find(); // Retrieve all vendors from MongoDB
    res.json(vendors); // Send the vendors as JSON response
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
});



// Endpoint to check if user is logged in
app.get('/check-login', (req, res) => {
  if (req.session.userId) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// Endpoint to check if vendor is logged in
app.get('/check-vendor-login', (req, res) => {
  if (req.session.vendorId) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// Function to check if the given address is the admin address
async function isAdminAddress(req, address) {
  // Assuming `req.session.userId` is the admin address
  return address === req.session.userId;
}
let adminAddress;
// Connect to your Ethereum client
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
web3.eth.net.getId()
  .then(async networkId => {
    const contractNetwork = require('./build/contracts/TenderManagement.json').networks[networkId];
    const contractAddress = contractNetwork.address;
    app.use(express.json());
    const tenderContract = new web3.eth.Contract(contractAbi, contractAddress);
// Get admin address from contract
adminAddress = await tenderContract.methods.admin().call();
    // Create tender endpoint with checkSession middleware
    app.post('/create-tender', async (req, res) => {
     
        try {
          const isAdmin = await isAdminAddress(req, req.session.userId);
          if (!isAdmin) {
            return res.status(403).json({ error: 'Only admin can perform this action' });
          }
        console.log("geee");
        const gasLimit = 2000000;
        const response = await tenderContract.methods.createTender(
          req.body.tenderName,
          req.body.tenderType,
          new Date(req.body.bidSubmissionDeadline).getTime() / 1000,
          new Date(req.body.contractSignDeadline).getTime() / 1000,
          req.body.estimatedCost,
          req.body.tenderDetails,
        ).send({ from: adminAddress,gas: gasLimit }); // Use session ID as the sender '0x7C8310a4256D48B59E7D2C42ff9F0E819Df97288'
        console.log('Transaction hash:', response.transactionHash);
        console.log('Tender created successfully:', response.events.TenderCreated.returnValues);
        res.json({ message: 'Tender created successfully' });

      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create tender', details: err.message });
      }
    });
// Define a route to get all tender details
app.get('/tender-details', async (req, res) => {
  try {
    // Get all tender IDs
    const tenderIds = await tenderContract.methods.getAllTenderIds().call();
    
    // Fetch details for each tender ID
    const allTenderDetails = await Promise.all(
      tenderIds.map(async (tenderId) => {
        const details = await tenderContract.methods.getTenderDetails(tenderId).call();
        return {
          tenderId: details[0],
          tenderName: details[1],
          tenderType: details[2],
          bidSubmissionDeadline: details[3],
          contractSignDeadline: details[4],
          estimatedCost: details[5],
          tenderDetails: details[6],
          isOpen: details[7],
          approved: details[8]
        };
      })
    );
    
    // Return all tender details as JSON response
    res.json(allTenderDetails);
  } catch (error) {
    // Return an error message if the call fails
    res.status(500).json({ error: 'Failed to get tender details', details: error.message });
  }
});
// Function to check if the given address is the vendor address
async function isVendorAddress(req, address) {
  // Assuming `req.session.vendorId` is the vendor's address
  console.log('Vendor Address:', address);
  return address === req.session.vendorId;
}

app.post('/submit-bid/:tenderId', async (req, res) => {
  const { tenderId } = req.params;
  const { amount } = req.body;
  const currentDate = Math.floor(Date.now() / 1000);
  console.log(a +"a");
  const gasLimit = 2000000;
   // Assuming session contains vendor address
   const vendorAddress = a;
   console.log('Session Data:', req.session);
   console.log('Vendor Address:', vendorAddress);
   try {
     // Check if vendorAddress is undefined
     if (!isVendorAddress(req,vendorAddress)) {
       return res.status(401).json({ error: 'Vendor not logged in' });
     }

    console.log('Vendor Address:', vendorAddress);
    // Submit the bid using the smart contract
    const bidAmount = web3.utils.toWei(amount.toString(), 'ether');
    await tenderContract.methods.submitBid(tenderId, amount, currentDate, vendorAddress).send({ from: vendorAddress ,gas: gasLimit});

    // Return success message
    res.json({ message: 'Bid submitted successfully' });
  } catch (error) {
    // Return an error message if the bid submission fails
    res.status(500).json({ error: 'Failed to submit bid', details: error.message });
  }
});



app.get('/bid-tender/:tenderId', async (req, res) => {
  const tenderId = req.params.tenderId; // Corrected parameter name
  try {
    const details = await tenderContract.methods.getTenderDetails(tenderId).call();
    const tenderDetails = {
      tenderId: details[0],
      tenderName: details[1],
      tenderType: details[2],
      bidSubmissionDeadline: details[3],
      contractSignDeadline: details[4],
      estimatedCost: details[5],
      tenderDetails: details[6],
      isOpen: details[7],
      approved: details[8]
    };
    res.json(tenderDetails);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get tender details', details: error.message });
  }
});

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error fetching network ID:', err);
  });
app.use(bodyParser.json());



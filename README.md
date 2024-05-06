# Smart Tender & Contract Management System Using Blockchain

This project is a decentralized application (DApp) for managing tenders and contracts using blockchain technology. The system aims to provide a transparent, secure, and efficient platform for organizations to create tenders, receive bids, and manage contracts, leveraging the immutability and transparency of blockchain.

## Features

- **Tender Creation:** Create new tenders with details such as tender type, name, estimated cost, application deadline, and contract sign details.
- **Bid Submission:** Vendors can view tender details and submit bids for the tenders they are interested in.
- **Bid Approval:** Admin can review and approve bids based on criteria such as bid amount, vendor reputation, and compliance with tender requirements.
- **Contract Management:** Manage contracts resulting from approved bids, including contract details, signing, and execution.
- **Blockchain Integration:** Utilizes blockchain technology (such as Ethereum) for secure and transparent record-keeping of tender and contract-related transactions.

- **Admin Dashboard:**
  - Create and manage tenders
  - View vendor details
  - Accept bids and approve tenders

- **Vendor Dashboard:**
  - View tender details
  - Bid on tenders
  - View bidding history

### Admin Dashboard Features

- **Create and manage tenders**: Admins can create new tenders, providing details such as tender type, name, estimated cost, deadline, contract details, and documents.
- **View vendor details**: Admins can view information about registered vendors, including contact information and past performance.
- **Accept bids and approve tenders**: Admins can review and accept bids submitted by vendors, then approve tenders to be awarded.

### Vendor Dashboard Features

- **View tender details**: Vendors can see detailed information about each tender, including requirements, deadlines, and current status.
- **Bid on tenders**: Vendors can submit bids for tenders they are interested in, providing their proposed cost and terms.
- **View bidding history**: Vendors can review their bidding history, including past bids and the status of each.
## Technologies Used

- **Frontend:** Angular
- **Backend:** Node.js
- **Blockchain Development:** Solidity, Truffle, Ganache
- **Database:** MongoDB
- **Other Tools:** Vscode, Metamask
## Installation

### Prerequisites
- Angular, Truffle and Node.js installed on your machine
- Ganache, MongoDB installed and running locally or a MongoDB Atlas account
- Metamask installed on your browser extensions

### Clone the Repository
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/SanthoshKumar2412/Smart-Tender-Contract-Management-System-Using-Blockchain.git
   
### Frontend Installation
#### Setup Angular Project
1. Navigate to the frontend directory:
   ```bash
   cd Smart-Tender-Contract-Management-System-Using-Blockchain/frontend
2. Install dependencies:
   ```bash
   npm install

3. Start the Angular development server:
   ```bash
   ng serve

4. Access the frontend in your browser at http://localhost:4200.

### Backend (Node.js)
#### Backend Installation
1. Install dependencies:
   ```bash
   npm install

2. Start the Node.js server: 
   ```bash
     ng start
3. The backend server should now be running at http://localhost:3000.

   

You can include these sections in your README.md file to provide installation instructions for both the frontend and backend of your project.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the backend server using `npm start`.
4. Start the frontend development server using `ng serve`.
5. Access the application at `http://localhost:4200`.

## Usage

1. **Admin Dashboard:**
   - Log in as an admin.
   - Create a new tender by providing details such as type, name, cost, deadline, and documents.
   - View the list of vendors and their details.
   - Accept bids from vendors and approve tenders.

2. **Vendor Dashboard:**
   - Log in as a vendor.
   - View available tenders and their details.
   - Place bids on tenders by specifying the bid amount and terms.
   - View bidding history and the status of previous bids.

3. **Blockchain Integration:**
   - Transactions related to tender creation, bid submission, and contract approval are recorded on the blockchain for transparency and security.

## Journal Paper Publication

- **Title:** AN EFFICIENT FRAMEWORK FOR SMART
TENDER/CONTRACT MANAGEMENT
SYSTEM
- **Authors:** N Moratanch, Santhoshkumar R, Siva Sanjai J G, Sudhakaran M,
- **Journal:**  International Journal of Creative Research Thoughts (IJCRT)
- **Publication Date:** 3 March 2024
- **Abstract:** Tenders must be included in the procurement process for companies and government organizations.
facilitating the acquisition of necessary products and services for seamless operations. Mismanagement of bids,
marked by issues such as favouritism, inadequate record-keeping, and lack of transparency, poses significant
financial risks and harms organizational reputation. Block chain technology emerges as a secure, decentralized
ledger system, ensuring tamper-proof transaction recording. Complemented by encryption, it transforms
sensitive information into unreadable code, safeguarding tender specifications, bid submissions, and approval
details. This innovative approach guarantees transparency and safety in the tendering process, effectively
mitigating risks associated with mismanagement of tenders and contracts while establishing a secure foundation
for procurement operations.
- **Link:** [Link to the paper](https://ijcrt.org/papers/IJCRT2403290.pdf)

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TenderManagement {
    struct Bid {
         uint256 amount;
         uint256 bidDate;
         address vendorId;
    }

    struct Tender {
        string tenderId;
        string tenderName;
        string tenderType;
        uint256 bidSubmissionDeadline;
        uint256 contractSignDeadline;
        uint256 estimatedCost;
        string tenderDetails;
      
        bool isOpen;
        mapping(address => uint256) bids;
        address[] bidders;
        mapping(address => bool) vendors;
        bool approved;
        mapping(address => bool) paid;
    }

    mapping(string => Tender) public tenders;
    // Define mapping to store bids for each tender
    mapping(string => mapping(address => Bid)) public bids;
    uint256 public tenderCount;
    address public admin;
    string[] public tenderIds;
    event TenderCreated(string tenderId, string tenderName, string tenderType, bool isOpen);
    event BidSubmitted(string tenderId, address bidder, uint256 amount, uint256 bidDate, address vendorId);
    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function createTender(
        string memory _tenderName,
        string memory _tenderType,
        uint256 _bidSubmissionDeadline,
        uint256 _contractSignDeadline,
        uint256 _estimatedCost,
        string memory _tenderDetails
    ) public onlyAdmin {
        require(_bidSubmissionDeadline < _contractSignDeadline, "Invalid deadlines");

        tenderCount++;
        
        string memory tenderId = string(abi.encodePacked("T", uintToString(tenderCount)));

        bool isOpen = block.timestamp < _bidSubmissionDeadline;

        Tender storage newTender = tenders[tenderId];
        newTender.tenderId = tenderId;
        newTender.tenderName = _tenderName;
        newTender.tenderType = _tenderType;
        newTender.bidSubmissionDeadline = _bidSubmissionDeadline;
        newTender.contractSignDeadline = _contractSignDeadline;
        newTender.estimatedCost = _estimatedCost;
        newTender.tenderDetails = _tenderDetails;
       
        newTender.isOpen = isOpen;
        tenderIds.push(tenderId);
        emit TenderCreated(tenderId, _tenderName, _tenderType, isOpen);
    }

    function getTenderDetails(string memory _tenderId) public view returns (
        string memory tenderId,
        string memory tenderName,
        string memory tenderType,
        uint256 bidSubmissionDeadline,
        uint256 contractSignDeadline,
        uint256 estimatedCost,
        string memory tenderDetails,
        bool isOpen,
        bool approved
    ) {
        Tender storage tender = tenders[_tenderId];
        require(bytes(tender.tenderName).length > 0, "Tender not found");

        return (
            tender.tenderId,
            tender.tenderName,
            tender.tenderType,
            tender.bidSubmissionDeadline,
            tender.contractSignDeadline,
            tender.estimatedCost,
            tender.tenderDetails,
            tender.isOpen,
            tender.approved
        );
    }

    function getAllTenderIds() public view returns (string[] memory) {
        return tenderIds;
    }

 function getAllTenderDetails() public view returns (
    string[] memory,
    string[] memory,
    string[] memory,
    uint256[] memory,
    uint256[] memory,
    uint256[] memory,
    string[] memory
) {
    string[] memory allTenderIds = new string[](tenderCount);
    string[] memory tenderNames = new string[](tenderCount);
    string[] memory tenderTypes = new string[](tenderCount);
    uint256[] memory bidSubmissionDeadlines = new uint256[](tenderCount);
    uint256[] memory contractSignDeadlines = new uint256[](tenderCount);
    uint256[] memory estimatedCosts = new uint256[](tenderCount);
    string[] memory tenderDetails = new string[](tenderCount);

    for (uint256 i = 0; i < tenderCount; i++) {
        Tender storage tender = tenders[tenderIds[i]];
        allTenderIds[i] = tender.tenderId;
        tenderNames[i] = tender.tenderName;
        tenderTypes[i] = tender.tenderType;
        bidSubmissionDeadlines[i] = tender.bidSubmissionDeadline;
        contractSignDeadlines[i] = tender.contractSignDeadline;
        estimatedCosts[i] = tender.estimatedCost;
        tenderDetails[i] = tender.tenderDetails;
    }

    return (allTenderIds, tenderNames, tenderTypes, bidSubmissionDeadlines, contractSignDeadlines, estimatedCosts, tenderDetails);
}


function getAllTenderStatus() public view returns (
    bool[] memory,
    bool[] memory
) {
    bool[] memory isOpens = new bool[](tenderCount);
    bool[] memory approved = new bool[](tenderCount);

    for (uint256 i = 0; i < tenderCount; i++) {
        Tender storage tender = tenders[tenderIds[i]];
        isOpens[i] = tender.isOpen;
        approved[i] = tender.approved;
    }

    return (isOpens, approved);
}
function submitBid(string memory _tenderId, uint256 _amount, uint256 _currentDate, address _vendorId) public {
    require(bytes(tenders[_tenderId].tenderId).length > 0, "Tender not found");
    require(tenders[_tenderId].isOpen, "Tender is not open for bidding");
    require(!tenders[_tenderId].approved, "Tender is already approved");
    require(bids[_tenderId][msg.sender].amount == 0, "Vendor has already submitted a bid");
    require(_currentDate <= tenders[_tenderId].bidSubmissionDeadline, "Bid submission deadline has passed");
   
    // Add the bid amount, current date, and vendor ID to the bids mapping for the sender
    bids[_tenderId][msg.sender] = Bid({
        amount: _amount,
        bidDate: _currentDate,
        vendorId: _vendorId
    });

    // Emit an event to indicate that a bid has been submitted
    emit BidSubmitted(_tenderId, msg.sender, _amount, _currentDate, _vendorId);
}

function isBidder(string memory _tenderId, address _vendorAddress) public view returns (bool) {
    for (uint256 i = 0; i < tenders[_tenderId].bidders.length; i++) {
        if (tenders[_tenderId].bidders[i] == _vendorAddress) {
            return true;
        }
    }
    return false;
}


    function uintToString(uint256 _i) public pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len = 0;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            bstr[--k] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
}

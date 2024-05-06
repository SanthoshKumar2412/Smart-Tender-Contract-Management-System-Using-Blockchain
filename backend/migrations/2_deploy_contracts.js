const TenderManagement = artifacts.require("TenderManagement");

module.exports = async function (deployer) {
  // Deploy TenderManagement contract with a specified gas limit
  await deployer.deploy(TenderManagement, { gas: 6721975000 });
  const tenderManagementInstance = await TenderManagement.deployed();

  console.log("TenderManagement contract deployed at:", tenderManagementInstance.address);
};

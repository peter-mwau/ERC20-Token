require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/ZBY5AzR16waI0CK-kL9oae7lZ1EXdkYH",
      accounts: ["9c291559b0e3a77cdb5dedfce4d2cce8fe2abe84c5fb527070b4542c1c5d99d7"]
    },
  }
};

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    hardhat: {
      chainId: 1337,
      // url: process.env.VITE_APP_RPC_URL,
      // privatekey: process.env.VITE_APP_PRIVATE_KEY
    }
  }
};

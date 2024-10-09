const hre = require("hardhat");

async function main() {
  try{
  const ERC20 = await hre.ethers.getContractFactory("ERC20Token");
  const erc20 = await ERC20.deploy();

  console.log(erc20);

  // No need to call `await voting.deployed();` as `Voting.deploy()` already waits for it to be deployed

  console.log("Voting contract deployed to:", erc20.target);
} catch(error) {
  console.log("Error deploying contract", error);
}
}

//Localhost Hardhat node deployment
// Voting contract deployed to: 0x5fbdb2315678afecb367f032d93f642f64180aa3

//Sepolia deployment
// Voting contract deployed to: 0x1EB15bF59Fb0250CC5377803476DB76F13e70dD0

//Skale deployment
// Voting contract deployed to: 0xdebFc4aFd3141178285867266111887A171091F2

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
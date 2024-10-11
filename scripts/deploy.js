const hre = require("hardhat");

async function main (){
    const ERC20 = await ethers.getContractFactory("ERC20Token");
    const erc20 = await ERC20.deploy();

    console.log("ERC20Token deployed to:", erc20.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
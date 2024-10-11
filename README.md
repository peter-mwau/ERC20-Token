# Simple ERC20 Token Project

This project demonstrates the creation and minting of ERC20 tokens, showcasing a simple functionality where users can mint a maximum of **5 TTKN** tokens for adding people. This acts as an award mechanism for users who contribute to the application. 

The smart contract is written in **Solidity** and implemented using **Hardhat**, **Vite**, and **TailwindCSS**. Additionally, the person data is stored on **IPFS** using the **Pinata** pinning provider. This project leverages the OpenZeppelin ERC20 token smart contract as a foundation.

## Features

- **ERC20 Token Creation**: A custom token named **TTKN**.
- **Minting Functionality**: Users can mint up to 5 TTKN tokens for adding people.
- **IPFS Integration**: Store person data on IPFS using Pinata for decentralized storage.
- **Test Network Deployment**: The smart contract is deployed on the **Sepolia Test Network**.

## Technologies Used

- Solidity
- Hardhat
- Vite
- TailwindCSS
- OpenZeppelin Contracts
- IPFS (via Pinata)

## Getting Started

To clone and run the project locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm or Yarn
- Hardhat

### Clone the Repository

```bash
git clone https://github.com/peter-mwau/ERC20-Token.git
cd erc20
```

### Install Dependencies
```
npm install
```

### Compile the Smart Contract
```
npx hardhat compile
```

### Deploy the Smart Contract
- Ensure you have configured your environment variables for the Sepolia Test Network in a .env file.
- Run the deployment script:

```
npx hardhat run scripts/deploy.js --network sepolia
```

### Run the Frontend
```
npm run dev
```
- Your application should now be running locally. Visit http://localhost:3000 (or the port specified in your terminal) to view it in your browser.

### License
- This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgments
- OpenZeppelin for the ERC20 token implementation.
- Pinata for the IPFS pinning service.


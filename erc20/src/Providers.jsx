import { useState, useEffect, useMemo} from "react";
import WalletContext from "../src/contexts/WalletContext";
import Web3 from 'web3';
import ERC20 from "../../artifacts/contracts/ERC20.sol/ERC20Token.json";
import PropTypes from "prop-types";
import React from 'react';


export default function Providers({ children }) {
	const [account, setAccount] = useState(null);
	const [balance, setBalance] = useState('');
	const [isWalletConnected, setIsWalletConnected] = useState(false);
	const [tokenBalance, setTokenBalance] = useState('0');

	const contractABI = ERC20;
	const contractAddress = import.meta.env.REACT_APP_CONTRACT_ADDRESS;

	
	const connectWallet = async () => {
		if (window.ethereum) {
		  try {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			// getbalance
			const web3 = new Web3(window.ethereum);
			const weiBalance = await web3.eth.getBalance(accounts[0]);
			const balance = web3.utils.fromWei(weiBalance, 'ether');
			setBalance(balance);
			setAccount(accounts[0]);
			setIsWalletConnected(true);
			
			
			// Fetch custom token balance
			const tokenContract = new web3.eth.Contract(contractABI, contractAddress);
			const tokenBalanceRaw = await tokenContract.methods.balanceOf(accounts[0]).call();

			// Get token decimals
			const tokenDecimals = await tokenContract.methods.decimals().call();
			const divisor = Math.pow(10, Number(tokenDecimals)); // Convert divisor to a regular number

			// Convert tokenBalanceRaw to a regular number and divide
			const tokenBalanceNumber = Number(tokenBalanceRaw); // Convert balance to a regular number
			const formattedTokenBalance = tokenBalanceNumber / divisor;

			// Set the token balance in state for easier display, if needed
			setTokenBalance(formattedTokenBalance);

			console.log("Token Balance: ", formattedTokenBalance);
			console.log("Token Balance: ", tokenBalance);
		  } catch (error) {
			console.error("Failed to connect to MetaMask:", error);
		  }
		} else {
		  console.log('Please install MetaMask!');
		}
	  };

	  useEffect(() => {
		console.log("Account: ", account, "Balance: ", balance, "Token Balance: ", tokenBalance, "Connection Status: ", isWalletConnected);
	  }, [account, balance,tokenBalance, isWalletConnected]);
	  
	  const disconnectWallet = () => {
		setAccount(null); // Resets the connected account state
		setIsWalletConnected(false);
	  };

	


		    // Memoize the context value to avoid unnecessary re-renders
		const walletContextValue = useMemo(() => ({
			account,
			balance,
			tokenBalance,
			isWalletConnected,
			connectWallet,
			disconnectWallet,
		}), [account,balance, tokenBalance, isWalletConnected]);

        //proptypes
        Providers.propTypes = {
            children: PropTypes.node.isRequired,
        };

	return (
				<WalletContext.Provider value={walletContextValue}>
					{children}
				</WalletContext.Provider>
	);
}
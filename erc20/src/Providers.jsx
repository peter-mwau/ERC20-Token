import { useState, useEffect, useMemo } from "react";
import WalletContext from "../src/contexts/WalletContext";
import Web3 from 'web3';
import ERC20 from "../../artifacts/contracts/ERC20.sol/ERC20Token.json";
import PropTypes from "prop-types";
import React from 'react';
import { getFromIPFS as fetchFromIPFS } from '../pinata';

export default function Providers({ children }) {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState('');
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [tokenBalance, setTokenBalance] = useState('0');
    const [peopleData, setPeopleData] = useState([]); // New state to store fetched data

    const storedHashes = JSON.parse(localStorage.getItem('ipfsHashes') || '[]');
    const contractABI = ERC20.abi; // Ensure you use the correct property for ABI
    const contractAddress = import.meta.env.REACT_APP_CONTRACT_ADDRESS;

    // Function to return data from Pinata
    const getFromIPFS = async () => {
        try {
            const peoplePromises = storedHashes.map(async (hash) => {
                const personData = await fetchFromIPFS(hash);
                return personData; // Return the fetched data
            });

            // Wait for all promises to resolve
            const people = await Promise.all(peoplePromises);
            console.log("Fetched People Data: ", people);
            setPeopleData(people); // Store in state
        } catch (error) {
            console.error("Error fetching data from IPFS:", error);
        }
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(window.ethereum);
                const weiBalance = await web3.eth.getBalance(accounts[0]);
                const balance = web3.utils.fromWei(weiBalance, 'ether');
                setBalance(balance);
                setAccount(accounts[0]);
                setIsWalletConnected(true);
                
                // Fetch custom token balance
                const tokenContract = new web3.eth.Contract(contractABI, contractAddress);
                const tokenBalanceRaw = await tokenContract.methods.balanceOf(accounts[0]).call();
                const tokenDecimals = await tokenContract.methods.decimals().call();
                const divisor = Math.pow(10, Number(tokenDecimals)); 
                const formattedTokenBalance = tokenBalanceRaw / divisor;
                setTokenBalance(formattedTokenBalance);
                
                console.log("Token Balance: ", formattedTokenBalance);
            } catch (error) {
                console.error("Failed to connect to MetaMask:", error);
            }
        } else {
            console.log('Please install MetaMask!');
        }
    };

    useEffect(() => {
        console.log("Account: ", account, "Balance: ", balance, "Token Balance: ", tokenBalance, "Connection Status: ", isWalletConnected);
    }, [account, balance, tokenBalance, isWalletConnected]);

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
        peopleData, // Include fetched data in context
    }), [account, balance, tokenBalance, isWalletConnected, peopleData]);

    // PropTypes
    Providers.propTypes = {
        children: PropTypes.node.isRequired,
    };

    // Fetch data from IPFS when the component mounts
    useEffect(() => {
        getFromIPFS();
    }, []);

    return (
        <WalletContext.Provider value={walletContextValue}>
            {children}
        </WalletContext.Provider>
    );
}

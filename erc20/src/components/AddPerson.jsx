import React, { useContext, useState } from "react";
import Web3 from "web3";
import ERC20 from "../../../artifacts/contracts/ERC20.sol/ERC20Token.json";
import WalletContext from "../contexts/WalletContext";
import { IoCloseCircleSharp } from "react-icons/io5";
import PropTypes from "prop-types";
import pinataSDK from "@pinata/sdk";
import { uploadMetadataToIPFS } from '../../pinata';

// Initialize Pinata SDK
const pinata = new pinataSDK(import.meta.env.REACT_APP_PINATA_API_KEY, import.meta.env.REACT_APP_PINATA_API_SECRET);
const contractAddress = import.meta.env.VITE_APP_CONTRACT_ADDRESS;

const AddPerson = ({ onClose }) => {
  const { account, connectWallet, isWalletConnected } =
    useContext(WalletContext);
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [age, setAge] = useState("");
  const [married, setmarried] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetFormFields = () => {
    setName("");
    setIdNumber("");
    setAge("");
    setmarried("");
  };

  const getSigner = async () => {
    if (!isWalletConnected || !account) {
      await connectWallet();
    }
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      return accounts[0]; // Return the first account (signer)
    } else {
      console.error("Please install MetaMask or another Ethereum wallet.");
      throw new Error("No Ethereum wallet found");
    }
  };



//   const handleDataUpload = async (name, idNumber, age, gender) => {
//       const data = {
//           name: name,
//           idNumber: idNumber,
//           age: age,
//           gender: gender
//       }

//       try {
//           const response = await pinata.uploadMetadataToIPFS(data);
//           console.log("Response: ",response);
//           return response
//       } catch (error) {
//           console.error("Error uploading document to Pinata: ", error);
//           setError("Error uploading document.");
//       }
//   };

const addPerson = async () => {
    setLoading(true);
    setError("");
    try {
        const signer = await getSigner();
        if (!signer) {
            setError("Signer not found.");
            return;
        }

        const isMarried = Boolean(married); 

        // Step 2: Interact with the contract
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' }); // Ensure accounts are unlocked
        const contract = new web3.eth.Contract(ERC20.abi, contractAddress);
        
        console.log("Adding person with: ", { name, idNumber, age, isMarried }); // Log inputs

        const transaction = await contract.methods
            .addPerson(name, idNumber, age, isMarried)
            .send({ from: signer });

        const receipt = await transaction;
        if (receipt.status) {
            console.log("Transaction successful with receipt: ", receipt);
            
            // Step 1: Upload data to IPFS only if transaction was successful
            const response = await uploadMetadataToIPFS(name, idNumber, age, isMarried);
            if (!response) {
                setError("IPFS upload failed.");
                return; // Handle if upload fails
            }
            
            setSuccess("Registration Successful!!");
            resetFormFields();
        } else {
            console.error("Transaction failed:", receipt);
            setError("Transaction failed.");
        }
    } catch (error) {
        console.error("Error registering voter: ", error.message || error);
        setError("An error occurred while registering the voter.");
    } finally {
        setLoading(false);
    }
};



  AddPerson.propTypes = {
    onClose: PropTypes.func.isRequired, // Assuming onClose is a required function
  };

  return (
    <>
      <div className="container mx-auto h-auto">
        <div className="flex justify-center items-center mt-[20px]">
          <IoCloseCircleSharp
            className="absolute z-20 w-10 h-10 text-red-600 bg-white hover:cursor-pointer items-end justify-end mx-auto flex text-end left-[85%] top-[90px] rounded-full"
            onClick={onClose}
          />
          <div className="w-full max-w-md">
            <form className="bg-white dark:bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:shadow-white">
              <h2 className="text-center uppercase font-semibold text-cyan-950 dark:text-white pb-5 text-2xl">
                Add Person Form
              </h2>
              {success ? (
                <p className="text-center text-green-500 pb-2">{success}</p>
              ) : (
                <p className="text-red-600 text-sm mb-4">{error}</p>
              )}

              <div className="flex flex-row gap-5 w-full">
                <div className="mb-4 w-[50%]">
                  <label
                    className="block text-gray-900 dark:text-white text-sm font-bold mb-2"
                    htmlFor="county"
                  >
                    Official Names:
                  </label>
                  <input
                    id="name"
                    className="shadow border dark:border-none dark:text-gray-300 dark:shadow-sm dark:shadow-yellow-400 font-semibold italic rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* ID Number */}
                <div className="mb-4 w-[50%]">
                  <label
                    className="block text-gray-900 dark:text-white text-sm font-bold mb-2"
                    htmlFor="idNumber"
                  >
                    ID Number:
                  </label>
                  <input
                    className="shadow border dark:border-none dark:text-gray-300 dark:shadow-sm dark:shadow-yellow-400 font-semibold italic rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={idNumber}
                    name="id"
                    type="number"
                    onChange={(e) => setIdNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-row gap-5 w-full">
                {/* Age */}
                <div className="mb-4 w-[50%]">
                  <label
                    className="block text-gray-900 dark:text-white text-sm font-bold mb-2"
                    htmlFor="age"
                  >
                    Age:
                  </label>
                  <input
                    className="shadow border dark:border-none dark:text-gray-300 dark:shadow-sm dark:shadow-yellow-400 font-semibold italic rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={age}
                    type="number"
                    name="age"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                {/* marital status */}
                <div className="mb-4 w-[50%]">
                  <label
                    className="block text-gray-900 dark:text-white text-sm font-bold mb-2"
                    htmlFor="voterGender"
                  >
                    Gender:
                  </label>
                  <select className="shadow border dark:border-none dark:text-gray-900 dark:shadow-sm dark:shadow-yellow-400 font-semibold italic rounded w-full py-2 px-3 text-gray-900 focus:outline-none focus:shadow-outline" value={married} onChange={(e) => setmarried(e.target.value)}>
                    <option>--select option--</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={addPerson}
                  className={`bg-cyan-950 text-white font-semibold w-auto m-2 rounded-lg dark:bg-yellow-500 p-2  focus:outline-none focus:shadow-outline ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Person"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPerson;

import axios from 'axios';
// const FormData = require('form-data');


const pinataApiKey = import.meta.env.VITE_APP_PINATA_API_KEY;
const pinataSecretApiKey = import.meta.env.VITE_APP_PINATA_API_SECRET;

export const uploadToPinata = async (file) => {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

  console.log("URL: ", url);
  console.log("API_KEY: ", pinataApiKey);
  console.log("Secret: ", pinataSecretApiKey);

  if (!url) {
    throw new Error('Pinata API endpoint URL is not defined');
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(url, formData, {
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });

    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading to Pinata:', error.response ? error.response.data : error.message);
    throw error;
  }
};
export const uploadMetadataToIPFS = async (metadata) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  return axios.post(url, metadata, {
    headers: {
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey
    }
  }).then(response => {
    console.log('Metadata IPFS hash:', response.data.IpfsHash);
    return response.data.IpfsHash;
  }).catch(error => {
    console.error('Error uploading metadata to IPFS:', error);
  });
};

export const getFromIPFS = async (ipfsHash) => {
  const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  console.log("Hash: ", ipfsHash);

  return axios.get(url).then(response => {
    return response.data;
  }).catch(error => {
    console.error('Error fetching from IPFS:', error);
    throw error;
  });
};

export const getPinnedData = async () => {
  const url = `https://api.pinata.cloud/data/pinList?status=pinned`;

  try {
      const response = await axios.get(url, {
          headers: {
              pinata_api_key: pinataApiKey,
              pinata_secret_api_key: pinataSecretApiKey
          },
      });

      return response.data.rows; // This will return the array of pinned files
  } catch (error) {
      console.error("Error fetching data from Pinata:", error);
      throw error;
  }
};

import axios from "axios";



const axiosClient = axios.create();

// axiosClient.defaults.baseURL = 'https://affinitycoders.com/foodapp/public/api/';
axiosClient.defaults.baseURL = 'https://affinitycoders.com/wooeats/public/api';
// axiosClient.defaults.baseURL = process.env.API_BASE_URL;
// const baseURL = process.env.API_BASE_URL;


//get token from local storage
// export const getAccessToken = () => {
//     return localStorage.getItem("accessToken");
// };

const accessToken = localStorage.getItem("accessToken");


axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    // "Content-Type": "multipart/form-data",
    'Authorization': `Bearer ${accessToken}`,
    Accept: 'application/json'
};

//All request will wait 5 seconds before timeout
axiosClient.defaults.timeout = 60000;

axiosClient.defaults.withCredentials = false;

export default axiosClient;
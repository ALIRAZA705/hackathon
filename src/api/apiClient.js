import axios from "axios";



const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'https://affinitycoders.com/foodapp/public/api/';
// axiosClient.defaults.baseURL = process.env.API_BASE_URL;
// const baseURL = process.env.API_BASE_URL;

axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

//All request will wait 5 seconds before timeout
axiosClient.defaults.timeout = 60000;

axiosClient.defaults.withCredentials = false;

export default axiosClient;
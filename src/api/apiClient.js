import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'https://eat-today.com/wooeats/api';

const accessToken = localStorage.getItem("accessToken");


axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    // "Content-Type": "multipart/form-data",
    'Authorization': `Bearer ${accessToken}`,
    Accept: 'application/json'
};

axiosClient.defaults.timeout = 60000;

axiosClient.defaults.withCredentials = false;

export default axiosClient;
import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'http://edge.portal.com:3000/api';

const accessToken = localStorage.getItem("accessToken");


axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    // "Content-Type": "multipart/form-data",
    'Authorization': `${accessToken}`,
    Accept: 'application/json'
};

axiosClient.defaults.timeout = 60000;

axiosClient.defaults.withCredentials = false;

export default axiosClient;
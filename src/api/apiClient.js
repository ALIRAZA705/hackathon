import axios from "axios";



const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.PUBLIC_URL;

axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

//All request will wait 5 seconds before timeout
axiosClient.defaults.timeout = 5000;

axiosClient.defaults.withCredentials = true;

export default axiosClient;
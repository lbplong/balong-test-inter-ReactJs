import axios from "axios";
import queryString from "query-string";



const axiosPort = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosPort.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


axiosPort.interceptors.response.use((response) => {
    if (response && response.data) {
    return response.data;
    }
    return response;
    }, (error) => {
    // Handle errors
    throw error;
});

export default axiosPort;
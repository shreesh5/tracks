import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance =  axios.create({
    baseURL: 'http://3f0c5de053c0.ngrok.io'
});

instance.interceptors.request.use(
    // function 1 - called automatically whenever we make a request
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    // function 2 - called automatically whenever there is an error with a request which we want to make
    (err) => {
        return Promise.reject(err);
    }
)

export default instance;
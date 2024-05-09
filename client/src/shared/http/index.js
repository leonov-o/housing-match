import axios from "axios";

const $api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_SERVER_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    config.headers.ContentType = 'application/json'
    return config
})

$api.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config;
        console.log(error.config._isRetry)
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/refresh`, {withCredentials: true});
                localStorage.setItem('token', response.data.access_token);
                return $api.request(originalRequest);
            } catch (e) {
                console.log(e.message)
            }
        }
        throw error;
    })
export default $api;

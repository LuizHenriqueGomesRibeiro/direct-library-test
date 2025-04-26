import axios, { AxiosRequestConfig } from "axios";
// import { parseCookies } from "nookies";

export const createConfiguredAxiosInstance = (options: any) => {
    const axiosInstance = axios.create({
        ...options,
        baseURL: options.url,
        headers: {
            "Content-Type": "application/json",
        }
    });

    axiosInstance.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            const axiosGssp = options.axiosGssp;

            if (axiosGssp) {
                const userConfig = axiosGssp(config);
                return userConfig;
            }

            return config;
        }, 
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return axiosInstance;
}
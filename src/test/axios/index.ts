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
            const userConfig = options.axiosGssp(config);
            return userConfig;
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
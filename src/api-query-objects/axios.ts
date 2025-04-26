import { parseCookies } from "nookies";

const axiosGssp = (config: any) => {
    const { token } = parseCookies();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}

export default axiosGssp;
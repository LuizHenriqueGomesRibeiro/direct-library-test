import { createConfiguredAxiosInstance } from "../axios";
import { AxiosInstance } from "axios";

class Http {
    public publicClient(gssp: any) {
        return createConfiguredAxiosInstance({
            gssp
        }) as AxiosInstance;
    }
  
    public privateClient(gssp: any) {
        return createConfiguredAxiosInstance({
            gssp
        }) as AxiosInstance;
    }
}

const http = new Http();
export default http;
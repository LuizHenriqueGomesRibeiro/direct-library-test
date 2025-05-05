import { createConfiguredAxiosInstance } from "../axios";
import { AxiosGsspProps } from "../types";
import { AxiosInstance } from "axios";

class Http {
    public publicClient(gssp: AxiosGsspProps) {
        return createConfiguredAxiosInstance({
            gssp
        }) as AxiosInstance;
    }
  
    public privateClient(gssp: AxiosGsspProps) {
        return createConfiguredAxiosInstance({
            gssp
        }) as AxiosInstance;
    }
}

const http = new Http();
export default http;
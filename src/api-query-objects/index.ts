import { BreedHoundImagesDataProps, BreedImageDataProps, PatrimonyAndPaymentDataProps, 
    PatrimonyAndPaymentParamProps, PostLoginParamsProps, PostLoginResponse } from "./types";
import axios, { AxiosRequestConfig } from "axios";
import { createCaucolum } from "@/test";

const API_BASE_URL = 'http://localhost:3000';
const EXTERNAL_DOG_API_BASE_URL = 'https://dog.ceo/api';

const axiosConfig = (config: AxiosRequestConfig): AxiosRequestConfig => {
    
    return config;
}

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

const caucolum = createCaucolum({
    api: {
        list: {
            url: API_BASE_URL + '/patrimonio-e-pagamento/all',
            method: 'get',
        },
        breed_image: {
            url: EXTERNAL_DOG_API_BASE_URL + '/breeds/image/random',
            method: 'get',
            DATA_PROPS: {} as BreedImageDataProps,
            serverSideResources: {
                disabledServerSideRequest: true
            },
            clientSideResources: {
                disabledClientSideRequest: false,
                onSuccess({ data, router }) {
                    
                },
                onError({ error, router }) {
                    
                },
            },
        },
        breed_hound_images: {
            url: EXTERNAL_DOG_API_BASE_URL + '/breed/hound/images',
            method: 'get',
            DATA_PROPS: {} as BreedHoundImagesDataProps,
            clientSideResources: {
                disabledClientSideRequest: true
            }
        },
        login: {
            url: API_BASE_URL + '/auth/login',
            method: 'post',
            ARGS_PROPS: {} as PostLoginParamsProps,
            DATA_PROPS: {} as PostLoginResponse,
            serverSideResources: {
                disabledServerSideRequest: true,
            }
        },
        getPatrimonyAndPaymentsParams: {
            url: API_BASE_URL + '/patrimonio-e-pagamento',
            method: 'get',
            ARGS_PROPS: {} as string,
            DATA_PROPS: {} as PatrimonyAndPaymentParamProps,
        },
        getPatrimonyAndPaymentsCalculate: {
            url: API_BASE_URL + '/stocks/list',
            method: 'get',
            ARGS_PROPS: {} as PatrimonyAndPaymentParamProps,
            DATA_PROPS: {} as PatrimonyAndPaymentDataProps,
        }
    }, 
    axiosConfig, 
    axiosInstance
});

export {
    caucolum
}
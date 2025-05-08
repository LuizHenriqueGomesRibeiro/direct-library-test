import { PatrimonyAndPaymentDataProps, PatrimonyAndPaymentParamProps, PostLoginParamsProps, PostLoginResponse } from "./types";
import { ApiEndpoint, createClientNextArchitecture, createServerNextArchitecture } from "@/test";

import axiosGssp from "./axios";

const API_BASE_URL = 'http://localhost:3000';
const EXTERNAL_DOG_API_BASE_URL = 'https://dog.ceo/api';

export interface BreedHoundImagesDataProps {
    message: string[];
    status: string;
}

interface BreedImageDataProps {
    message: string,
    status: string,
}

const api = {
    list: {
        url: API_BASE_URL + '/patrimonio-e-pagamento/all',
        method: 'get'
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
            onSuccess({ data, dispatcher }) {
                dispatcher.push('/redirected');
                dispatcher.data(data);
                dispatcher.forward();
            },
            onError({ error }) {
                
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
} as const satisfies Record<string, ApiEndpoint>;

const server = createServerNextArchitecture(api, axiosGssp);
const client = createClientNextArchitecture(api, axiosGssp);

const caucolum = {
    server,
    client,
}

export default caucolum;
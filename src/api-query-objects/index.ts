import { ApiEndpoint, createClientNextArchitecture, createServerNextArchitecture } from "@/test";
import { PatrimonyAndPaymentDataProps, PatrimonyAndPaymentParamProps, PostLoginParamsProps, PostLoginResponse } from "./types";

const API_BASE_URL = 'http://localhost:3000';
const EXTERNAL_DOG_API_BASE_URL = 'https://dog.ceo/api';

export interface BreedHoundImagesDataProps {
    message: string[];
    status: string;
}

const api = {
    breed_image: {
        url: 'https://dog.ceo/api/breeds/image/random',
        authenticated: false,
        method: 'get'
    },
    breed_hound_images: {
        url: `${EXTERNAL_DOG_API_BASE_URL}/breed/hound/images`,
        authenticated: false,
        method: 'get',
        DATA_PROPS: {} as BreedHoundImagesDataProps,
    },
    login: {
        url: `${API_BASE_URL}/auth/login`,
        authenticated: false,
        method: 'post',
        ARGS_PROPS: {} as PostLoginParamsProps,
        DATA_PROPS: {} as PostLoginResponse,
        redirect_url: '/pagina-central'
    },
    getPatrimonyAndPaymentsParams: {
        url: `${API_BASE_URL}/patrimonio-e-pagamento`,
        authenticated: true,
        method: 'get',
        ARGS_PROPS: {} as string,
        DATA_PROPS: {} as PatrimonyAndPaymentParamProps,
    },
    getPatrimonyAndPaymentsCalculate: {
        url: `${API_BASE_URL}/stocks/list`,
        authenticated: true,
        method: 'get',
        ARGS_PROPS: {} as PatrimonyAndPaymentParamProps,
        DATA_PROPS: {} as PatrimonyAndPaymentDataProps,
    }
} as const satisfies Record<string, ApiEndpoint>;

const serverQueriesObject = createServerNextArchitecture(api);
const clientQueriesObject = createClientNextArchitecture(serverQueriesObject, api);

export {
    serverQueriesObject,
    clientQueriesObject
}
import { AxiosRequestConfig } from "axios";
import { NextRouter } from "next/router";

export type AxiosGsspProps = (config: AxiosRequestConfig) => AxiosRequestConfig;

export type UseServiceCallStatusProps = 'idle' | 'loading' | 'loaded' | 'error';
export type MethodProps = 'get' | 'post' | 'put' | 'delete';

export interface ClientSideRequestProps {
    readonly disabledClientSideRequest?: boolean;
    readonly onSuccess?: ({ data, router } : { data?: any, router: NextRouter }) => void;
    readonly onError?: ({ error, router } : { error?: any, router: NextRouter }) => void;
}

export interface UseServiceCallProps {
    fn: any,
    resources?: ClientSideRequestProps,
}

export type ApiConfig = {
    [key: string]: {
        url: string;
        method: MethodProps;
        ARGS_PROPS?: unknown;
        DATA_PROPS?: unknown;
        ERROR_PROPS?: unknown;
        serverSideResources?: {
            disabledServerSideRequest?: boolean;
        };
        clientSideResources?: ClientSideRequestProps;
    };
};

export interface ApiClientResourcesProps<T = any, K = any, M = any> {
    makeRequest: (props?: K) => void,
    status: UseServiceCallStatusProps,
    error: M,
    data: T,
    args: K,
}

export type ServerApiMethods<T extends ApiConfig> = {
    [K in keyof T]: (params?: T[K]['ARGS_PROPS']) => Promise<T[K]['DATA_PROPS']>;
};

export type ClientApiMethods<T extends ApiConfig> = {
    [K in keyof T]: (params?: any) => ApiClientResourcesProps<T[K]["DATA_PROPS"], T[K]["ARGS_PROPS"], T[K]["ERROR_PROPS"]>;
};

export interface ServerSideProps {
    disabledServerSideRequest?: boolean
}
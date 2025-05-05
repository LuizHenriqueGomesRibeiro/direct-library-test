import { ApiConfig, AxiosGsspProps, ClientApiMethods, ClientSideRequestProps, MethodProps, ServerApiMethods } from "./types";
import { ApiClientResourcesProps } from "./types";

import useServiceCall from "./useServiceCall";
import http from "./http";

export interface ApiEndpoint<ArgsProps = unknown, DataProps = unknown> {
    readonly url: string;
    readonly method: MethodProps;
    readonly ARGS_PROPS?: ArgsProps;
    readonly DATA_PROPS?: DataProps;
    readonly serverSideResources?: {
        readonly disabledServerSideRequest?: boolean
    };
    readonly clientSideResources?: ClientSideRequestProps;
}

function createApiClass<T extends ApiConfig>(list: T, axiosGssp: AxiosGsspProps) {
    return class Api {
        constructor() {
            Object.keys(list).forEach((key) => {
                (this as any)[key] = async (params?: any) => {
                    return this.request(list[key].method, list[key].url, params);
                };
            });
        }
        
        async request(method: MethodProps, url: string, params?: any): Promise<any> {
            const response = await http.privateClient(axiosGssp)[method](url, { params });
            return response.data;
        }
    };
}

function createPrimitiveClient<T extends ServerApiMethods<any>, K extends ApiConfig>(serverApi: T, list: K): new () => { [K in keyof T]: () => any } {
    class PrimitiveClient {
        constructor() {
            Object.keys(serverApi).forEach((key) => {
                const resources = list[key as keyof K]?.clientSideResources;
                (this as any)[key] = () => {
                    return useServiceCall({ fn: serverApi[key as keyof T], resources }) as ApiClientResourcesProps; 
                };
            });
        }
    }

    return PrimitiveClient as new () => { [K in keyof T]: () => any };
}

type FilteredServerApi<T> = {
    [K in keyof T as T[K] extends { serverSideResources?: { disabledServerSideRequest?: true } } ? (
        T[K]['serverSideResources'] extends { disabledServerSideRequest: true } ? never : K
    ) : K]: T[K];
};

type FilteredClientApi<T> = {
    [K in keyof T as T[K] extends { clientSideResources?: { disabledClientSideRequest?: true } } ? (
        T[K]['clientSideResources'] extends { disabledClientSideRequest: true } ? never : K
    ) : K]: T[K];
};
  
function filterServerSideEndpoints<T extends ApiConfig>(list: T): FilteredServerApi<T> {
    const filtered = Object.fromEntries(
        Object.entries(list).filter(([_, value]) => {
            return !('serverSideResources' in value && value.serverSideResources?.disabledServerSideRequest === true);
        })
    );
    
    return filtered as FilteredServerApi<T>;
}

function filterClientSideEndpoints<T extends ApiConfig>(list: T): FilteredClientApi<T> {
    const filtered = Object.fromEntries(
        Object.entries(list).filter(([_, value]) => {
            return !('disabledClientSideRequest' in value && value.clientSideResources?.disabledClientSideRequest === true);
        })
    );

    return filtered as FilteredClientApi<T>;
}
  
function createServerNextArchitecture<T extends ApiConfig>(list: T, axiosGssp: AxiosGsspProps) {
    const filteredList = filterServerSideEndpoints(list);
    const PrimitiveServer = createApiClass(filteredList, axiosGssp);
    //@ts-ignore
    const server: ServerApiMethods<typeof filteredList> = new PrimitiveServer();
    return server;
}

function createClientNextArchitecture<K extends ApiConfig>(list: K, axiosGssp: AxiosGsspProps) {
    const filteredList = filterClientSideEndpoints(list);
    const PrimitiveServer = createApiClass(filteredList, axiosGssp);
    //@ts-ignore
    const server: ServerApiMethods<typeof filteredList> = new PrimitiveServer();
    const PrimitiveClient = createPrimitiveClient(server, filteredList);
    const client: ClientApiMethods<typeof filteredList> = new PrimitiveClient();

    return client;
}

export {
    createServerNextArchitecture,
    createClientNextArchitecture,
}
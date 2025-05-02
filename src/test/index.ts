import { ApiConfig, ClientApiMethods, MethodProps, ServerApiMethods } from "./types";
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
    readonly clientSideResources?: {
        readonly disabledClientSideRequest?: boolean,
        readonly onSuccess?: (data: any) => void,
        readonly onError?: () => void
    };
}

function createApiClass<T extends ApiConfig>(list: T, axiosGssp: any) {
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
                const redirector = list[key as keyof K]?.clientSideResources;
                (this as any)[key] = () => {
                    return useServiceCall({ fn: serverApi[key as keyof T] }) as ApiClientResourcesProps; 
                };
            });
        }
    }

    return PrimitiveClient as new () => { [K in keyof T]: () => any };
}

function createServerNextArchitecture<T extends ApiConfig>(list: T, axiosGssp: any) {
    const PrimitiveServer = createApiClass(list, axiosGssp);
    //@ts-ignore
    const server: ServerApiMethods<typeof list> = new PrimitiveServer();
    return server;
}

function createClientNextArchitecture<T extends ServerApiMethods<any>, K extends ApiConfig>(serverApi: T, list: K) {
    const PrimitiveClient = createPrimitiveClient(serverApi, list);
    const client: ClientApiMethods<typeof list> = new PrimitiveClient();
    return client;
}

export {
    createServerNextArchitecture,
    createClientNextArchitecture,
}
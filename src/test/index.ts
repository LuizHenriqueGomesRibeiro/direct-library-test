import { ApiConfig, ClientApiMethods, MethodProps, ServerApiMethods } from "./types";
import { ApiClientResourcesProps } from "./types";

import useServiceCall from "./useServiceCall";
import http from "./http";

export interface ApiEndpoint<ArgsProps = unknown, DataProps = unknown> {
    readonly url: string;
    readonly method: MethodProps;
    readonly authenticated: boolean;
    readonly ARGS_PROPS?: ArgsProps;
    readonly DATA_PROPS?: DataProps;
    readonly redirector?: string;
}

function createApiClass<T extends ApiConfig>(list: T) {
    return class Api {
        constructor() {
            Object.keys(list).forEach((key) => {
                (this as any)[key] = async (params?: any) => {
                    return this.request(list[key].method, list[key].url, list[key].authenticated, list[key].redirector, params);
                };
            });
        }
    
        async request(method: MethodProps, url: string, authenticated?: boolean, redirector?: string, params?: any): Promise<any> {
            const client = authenticated ? http.privateClient() : http.publicClient();
            const response = await client[method](url, { params });
            return response.data;
        }
    };
}

function createPrimitiveClient<T extends ServerApiMethods<any>, K extends ApiConfig>(serverApi: T, list: K): new () => { [K in keyof T]: () => any } {
    class PrimitiveClient {
        constructor() {
            Object.keys(serverApi).forEach((key) => {
                const redirector = list[key as keyof K]?.redirector;
                (this as any)[key] = () => {
                    return useServiceCall({ fn: serverApi[key as keyof T], config: { redirector } }) as ApiClientResourcesProps; 
                };
            });
        }
    }

    return PrimitiveClient as new () => { [K in keyof T]: () => any };
}

function createServerNextArchitecture<T extends ApiConfig>(list: T) {
    const PrimitiveServer = createApiClass(list);
    //@ts-ignore
    const server: ServerApiMethods<typeof list> = new PrimitiveServer();
    return server;
}

function createClientNextArchitecture<T extends ServerApiMethods<any>, K extends ApiConfig>(serverApi: T, list: K) {
    const PrimitiveClient = createPrimitiveClient(serverApi, list);
    const client: ClientApiMethods<K> = new PrimitiveClient();
    return client;
}

export {
    createServerNextArchitecture,
    createClientNextArchitecture,
}
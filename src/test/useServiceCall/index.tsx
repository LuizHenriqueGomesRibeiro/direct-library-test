"use client";

import { UseServiceCallProps, UseServiceCallStatusProps } from "../types";
import { useState } from "react";

const useServiceCall = ({ fn, resources }: UseServiceCallProps) => {
    const onSuccess = resources?.onSuccess;
    const onError = resources?.onError;
    
    const [status, setStatus] = useState<UseServiceCallStatusProps>('idle');
    const [router, setRouter] = useState<string>('');
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [args, setArgs] = useState(null);

    const dispatcher = () => {
        const push = (url: string) => {
            setRouter(url);
        }
        
        const data = (dispatcherData: any) => {
            setData(dispatcherData);
        }
        
        const forward = () => {
            if (router) {
                window.location.href = router;
            }
        }

        return { push, data, forward }
    }

    const makeRequest = async (...args: any) => {
        setStatus('loading');
        setArgs(args);

        try {
            const response = await fn(...args);
            setStatus("loaded");
            setData(response);

            if (onSuccess) {
                onSuccess({ data: response, dispatcher: dispatcher() });
            }
        } catch (error: any) {
            setStatus("error");
            setError(error);

            if (onError) {
                onError({ error });
            }
        }
    }

    return { 
        data, 
        status, 
        error, 
        args, 
        makeRequest 
    };
}

export default useServiceCall;
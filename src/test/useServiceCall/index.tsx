"use client";

import { UseServiceCallProps, UseServiceCallStatusProps } from "../types";
import { useRouter } from "next/router";
import { useState } from "react";

const useServiceCall = ({ fn, resources }: UseServiceCallProps) => {
    const onSuccess = resources?.onSuccess;
    const onError = resources?.onError;
    const router = useRouter();
    
    const [status, setStatus] = useState<UseServiceCallStatusProps>('idle');
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [args, setArgs] = useState(null);

    const makeRequest = async (...args: any) => {
        setStatus('loading');
        setArgs(args);

        try {
            const response = await fn(...args);
            setStatus("loaded");
            setData(response);

            if (onSuccess) {
                onSuccess({ data: response, router });
            }
        } catch (error: any) {
            setStatus("error");
            setError(error);

            if (onError) {
                onError({ error, router });
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
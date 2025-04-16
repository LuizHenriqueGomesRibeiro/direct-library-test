"use client"

import { useRouter } from "next/router";
import { UseServiceCallProps, UseServiceCallStatusProps } from "../types";
import { useState } from "react";

const useServiceCall = ({ fn, config }: UseServiceCallProps) => {
    const [status, setStatus] = useState<UseServiceCallStatusProps>('idle');
    const [args, setArgs] = useState(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const router = useRouter();

    const redirect_url = config?.redirect_url;

    const makeRequest = async (...args: any) => {
        setStatus('loading');
        setArgs(args);

        try {
            const response = await fn(...args);
            setData(response);
            setStatus("loaded");
            
            if (redirect_url) {
                router.push(redirect_url);
            }
        } catch (err: any) {
            setStatus("error");
            setError(err);
        }
    }

    return { data, status, error, args, makeRequest };
}

export default useServiceCall;
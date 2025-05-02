"use client";

import { UseServiceCallProps, UseServiceCallStatusProps } from "../types";
import { useRouter } from "next/router";
import { useState } from "react";

const useServiceCall = ({ fn, resources }: UseServiceCallProps) => {
    const [status, setStatus] = useState<UseServiceCallStatusProps>('idle');
    const [args, setArgs] = useState(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const router = useRouter();
    const onSuccess = resources?.onSuccess;

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
        } catch (err: any) {
            setStatus("error");
            setError(err);
        }
    }

    return { data, status, error, args, makeRequest };
}

export default useServiceCall;
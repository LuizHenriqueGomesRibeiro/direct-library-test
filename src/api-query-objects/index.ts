import { BreedHoundImagesDataProps, BreedImageDataProps } from "./types";
import axios, { AxiosRequestConfig } from "axios";
import { createCaucolum } from "@/test";

const EXTERNAL_DOG_API_BASE_URL = 'https://dog.ceo/api';

export default createCaucolum({
    api: {
        breed_image: {
            url: '/breeds/image/random',
            method: 'get',
            DATA_PROPS: {} as BreedImageDataProps,
            serverSideResources: {
                disabledServerSideRequest: true
            },
            clientSideResources: {
                disabledClientSideRequest: false,
            },
        },
        breed_hound_images: {
            url: '/breed/hound/images',
            method: 'get',
            DATA_PROPS: {} as BreedHoundImagesDataProps,
            clientSideResources: {
                disabledClientSideRequest: true
            }
        }
    }, 
    axiosConfig: (config: AxiosRequestConfig): AxiosRequestConfig => {
        return config;
    }, 
    axiosInstance: axios.create({
        baseURL: EXTERNAL_DOG_API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        }
    })
});
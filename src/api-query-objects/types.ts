export interface PostLoginParamsProps {
    email: string,
    password: string,
}

export interface PostLoginResponse {
    token: string,
    id: string,
}

export interface PatrimonyAndPaymentParamProps {
    start: string,
    end: string,
    monthyContribution: number,
    symbols: string,
    monthyContributionIncrementByYear: number,
    smartContribution: boolean,
}

export interface PatrimonyAndPaymentDataProps {
    payments: {
        year: number,
        payment: number,
    }[],
    quotes: {
        cumulativeContribution: number,
        cumulativePayment: number, 
        date: string, 
        monthyContribution: number, 
        patrimony: number, 
        payment: number,
        cumulativePosition: number,
        stocks: {
            cumulativeContributionWithoutDividends: number,
            cumulativeContribution: number,
            cumulativePosition: number, 
            cumulativePayment: number,
            ordenedStocks: number,
            patrimony: number,
            longName: string,
            payment: number,
            quote: number
            date: string,
            name: string,
            url: string,
        }[]
    }[],
    stocks: {
        ticket: string,
        url: string,
    }[],
    finalStatus: {
        cumulativePayment: number,
        patrimony: number
    }
}

export interface BreedHoundImagesDataProps {
    message: string[];
    status: string;
}

export interface BreedImageDataProps {
    message: string,
    status: string,
}
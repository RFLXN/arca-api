import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ROOT_URL } from "./constant";
import { ListFetchOption } from "./type";

class InvalidStatusCodeError extends Error {
    private readonly res: AxiosResponse;

    public constructor(cause: AxiosResponse) {
        super();
        this.res = cause;
    }

    public get cause() {
        return this.res;
    }
}

function createListUrl(board: string, page: number = 1, option?: ListFetchOption) {
    const url = new URL(`${ROOT_URL}/${board}`);

    if (option?.mode == "best") {
        url.searchParams.set("mode", "best");
    }

    if (option?.category) {
        url.searchParams.set("category", option.category);
    }

    if (option?.cut && option.cut > 0) {
        url.searchParams.set("cut", String(option.cut));
    }

    if (page > 1) {
        url.searchParams.set("p", String(page));
    }

    return url.toString();
}

type FetchOption = AxiosRequestConfig;

async function fetch(url: string, option?: FetchOption): Promise<string> {
    const res = await axios(url, option);

    if (res.status != 200) {
        throw new InvalidStatusCodeError(res);
    }

    return res.data as string;
}

export {
    fetch,
    createListUrl,
    InvalidStatusCodeError,
    FetchOption
};

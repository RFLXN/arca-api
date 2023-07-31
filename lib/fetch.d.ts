import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ListFetchOption } from "./type";
declare class InvalidStatusCodeError extends Error {
    private readonly res;
    constructor(cause: AxiosResponse);
    get cause(): AxiosResponse<any, any>;
}
declare function createListUrl(board: string, page?: number, option?: ListFetchOption): string;
type FetchOption = AxiosRequestConfig;
declare function fetch(url: string, option?: FetchOption): Promise<string>;
export { fetch, createListUrl, InvalidStatusCodeError, FetchOption };
//# sourceMappingURL=fetch.d.ts.map
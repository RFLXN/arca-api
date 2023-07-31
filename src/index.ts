import { createListUrl, fetch, FetchOption } from "./fetch";
import { parseList } from "./parse";
import { ListFetchOption } from "./type";
import { HOTDEAL_BOARD } from "./constant";

export { InvalidStatusCodeError, FetchOption } from "./fetch";
export { parseList };

export async function getArticleList(
    board: string,
    page: number = 1,
    boardOption?: ListFetchOption,
    fetchOption?: FetchOption
) {
    const url = createListUrl(board, page, boardOption);
    const res = await fetch(url, fetchOption);
    return parseList(res);
}

export async function getHotDealList(
    page: number = 1,
    boardOption?: ListFetchOption,
    fetchOption?: FetchOption
) {
    const url = createListUrl(HOTDEAL_BOARD, page, boardOption);
    const res = await fetch(url, fetchOption);
    return parseList(res);
}

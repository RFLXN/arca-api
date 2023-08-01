import { FetchOption } from "./fetch";
import { HotDealMetaData, ListFetchOption } from "./type";
export { InvalidStatusCodeError, FetchOption } from "./fetch";
export { HotDealMetaData, ListFetchOption };
export declare function getArticleList(board: string, page?: number, boardOption?: ListFetchOption, fetchOption?: FetchOption): Promise<import("./type").ArticleMetaData[]>;
export declare function getHotDealList(page?: number, boardOption?: ListFetchOption, fetchOption?: FetchOption): Promise<HotDealMetaData[]>;
//# sourceMappingURL=index.d.ts.map
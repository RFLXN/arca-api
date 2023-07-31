import { FetchOption } from "./fetch";
import { parseList } from "./parse";
import { HotDealMetaData, ListFetchOption } from "./type";
export { InvalidStatusCodeError, FetchOption } from "./fetch";
export { parseList };
export declare function getArticleList(board: string, page?: number, boardOption?: ListFetchOption, fetchOption?: FetchOption): Promise<import("./type").ArticleMetaData[]>;
export declare function getHotDealList(page?: number, boardOption?: ListFetchOption, fetchOption?: FetchOption): Promise<HotDealMetaData[]>;
//# sourceMappingURL=index.d.ts.map
interface ArticleMetaData {
    id: number;
    title: string;
    author: string;
    time: Date;
    view: number;
    rate: number;
}
interface HotDealMetaData extends ArticleMetaData {
    price: number;
    delivery: number;
    store: string;
    category: string;
    thumbnailUrl: string;
}
interface ListFetchOption {
    category?: string;
    mode?: "best" | "none";
    cut?: number;
}
export { ArticleMetaData, ListFetchOption, HotDealMetaData };
//# sourceMappingURL=type.d.ts.map
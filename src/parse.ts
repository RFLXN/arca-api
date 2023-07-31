import { load } from "cheerio";
import {
    isOnlyNum, replaceLineBreaks, replaceSpaces, replaceWonFormat
} from "./util";
import { ArticleMetaData, HotDealMetaData } from "./type";
import { ROOT_URL } from "./constant";

function parseList(html: string) {
    const $ = load(html);
    const $inner = $(".vrow-inner");

    const articles: ArticleMetaData[] = [];

    $inner.map((innerIdx, innerElem) => {
        const $currentInner = $(innerElem);

        // extract id
        const $idSpanWrap = $currentInner.find(".vcol.col-id");
        const id = replaceSpaces($idSpanWrap.children("span").first().text());
        if (!isOnlyNum(id)) return;

        // extract title
        const $titleSpanWrap = $currentInner.find(".title");
        const title = replaceLineBreaks($titleSpanWrap.text()).trim();

        // extract author
        const $authorWrap = $currentInner.find(".user-info");
        const author = replaceLineBreaks($authorWrap.children("span").first().text());

        // extract time
        const $timeWrap = $currentInner.find("time");
        const timeStr = $timeWrap.attr("datetime") as string;
        const time = new Date(timeStr);

        // extract view
        const $viewWrap = $currentInner.find(".col-view");
        const viewStr = replaceLineBreaks(replaceSpaces($viewWrap.text()));

        // extract rate
        const $rateWrap = $currentInner.find(".col-rate");
        const rateStr = replaceLineBreaks(replaceSpaces($rateWrap.text()));

        // extract url
        const $parent = $currentInner.parent();
        const url = `${ROOT_URL}${$parent.first().attr("href") as string}`;

        const article: ArticleMetaData = {
            id: Number(id),
            title,
            author,
            time,
            view: isOnlyNum(viewStr) ? Number(viewStr) : 0,
            rate: isOnlyNum(rateStr) ? Number(rateStr) : 0,
            url
        };

        articles.push(article);
    });

    return articles;
}

function parseHotDealList(html: string) {
    const $ = load(html);
    const $list = $(".vrow.hybrid");

    const articles: HotDealMetaData[] = [];

    $list.map((listIdx, listElem) => {
        const $current = $(listElem);

        // extract id
        const $idWrap = $current.find(".col-id");
        const $idSpan = $idWrap.children().first();
        const id = replaceSpaces($idSpan.text());

        // extract title
        const $title = $current.find(".title.hybrid-title");
        const title = replaceLineBreaks($title.text()).trim();

        // extract store
        const $store = $current.find(".deal-store");
        const store = $store.text();

        // extract category
        const $category = $current.find(".badges").children().last();
        const category = $category.text();

        // extract price
        const $price = $current.find(".deal-price");
        const priceStr = replaceLineBreaks(replaceWonFormat($price.text()));

        // extract delivery price
        const $delivery = $current.find(".deal-delivery");
        const deliveryStr = replaceLineBreaks(replaceWonFormat($delivery.text()));

        // extract author
        const $authorWrap = $current.find(".user-info");
        const author = $authorWrap.children().first().text();

        // extract time
        const $timeWrap = $current.find("time");
        const timeStr = $timeWrap.attr("datetime") as string;
        const time = new Date(timeStr);

        // extract view
        const $viewWrap = $current.find(".col-view");
        const viewStr = replaceLineBreaks(replaceSpaces($viewWrap.text()));

        // extract rate
        const $rateWrap = $current.find(".col-rate");
        const rateStr = replaceLineBreaks(replaceSpaces($rateWrap.text()));

        // extract thumbnail
        const $thumbnailWrap = $current.find(".vrow-preview");
        const thumbnailUrl = `https:${$thumbnailWrap.children().first().attr("src")}`;

        // extract url
        const $url = $current.find(".preview-image");
        const url = `${ROOT_URL}${($url.attr("href") as string)}`;

        const article: HotDealMetaData = {
            id: Number(id),
            title,
            time,
            author,
            view: isOnlyNum(viewStr) ? Number(viewStr) : 0,
            rate: isOnlyNum(rateStr) ? Number(rateStr) : 0,
            price: Number(priceStr),
            delivery: deliveryStr.includes("무료") ? 0 : Number(deliveryStr),
            store,
            category,
            thumbnailUrl,
            url
        };

        articles.push(article);
    });

    return articles;
}

export { parseList, parseHotDealList };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHotDealList = exports.parseList = void 0;
var cheerio_1 = require("cheerio");
var util_1 = require("./util");
var constant_1 = require("./constant");
function parseList(html) {
    var $ = (0, cheerio_1.load)(html);
    var $inner = $(".vrow-inner");
    var articles = [];
    $inner.map(function (innerIdx, innerElem) {
        var $currentInner = $(innerElem);
        var $idSpanWrap = $currentInner.find(".vcol.col-id");
        var id = (0, util_1.replaceSpaces)($idSpanWrap.children("span").first().text());
        if (!(0, util_1.isOnlyNum)(id))
            return;
        var $titleSpanWrap = $currentInner.find(".title");
        var title = (0, util_1.replaceLineBreaks)($titleSpanWrap.text()).trim();
        var $authorWrap = $currentInner.find(".user-info");
        var author = (0, util_1.replaceLineBreaks)($authorWrap.children("span").first().text());
        var $timeWrap = $currentInner.find("time");
        var timeStr = $timeWrap.attr("datetime");
        var time = new Date(timeStr);
        var $viewWrap = $currentInner.find(".col-view");
        var viewStr = (0, util_1.replaceLineBreaks)((0, util_1.replaceSpaces)($viewWrap.text()));
        var $rateWrap = $currentInner.find(".col-rate");
        var rateStr = (0, util_1.replaceLineBreaks)((0, util_1.replaceSpaces)($rateWrap.text()));
        var $parent = $currentInner.parent();
        var url = "".concat(constant_1.ROOT_URL).concat($parent.first().attr("href"));
        var article = {
            id: Number(id),
            title: title,
            author: author,
            time: time,
            view: (0, util_1.isOnlyNum)(viewStr) ? Number(viewStr) : 0,
            rate: (0, util_1.isOnlyNum)(rateStr) ? Number(rateStr) : 0,
            url: url
        };
        articles.push(article);
    });
    return articles;
}
exports.parseList = parseList;
function parseHotDealList(html) {
    var $ = (0, cheerio_1.load)(html);
    var $list = $(".vrow.hybrid");
    var articles = [];
    $list.map(function (listIdx, listElem) {
        var $current = $(listElem);
        var $idWrap = $current.find(".col-id");
        var $idSpan = $idWrap.children().first();
        var id = (0, util_1.replaceSpaces)($idSpan.text());
        var $title = $current.find(".title.hybrid-title");
        var title = (0, util_1.replaceLineBreaks)($title.text()).trim();
        var $store = $current.find(".deal-store");
        var store = $store.text();
        var $category = $current.find(".badges").children().last();
        var category = $category.text();
        var $price = $current.find(".deal-price");
        var priceStr = (0, util_1.replaceLineBreaks)((0, util_1.replaceWonFormat)($price.text()));
        var $delivery = $current.find(".deal-delivery");
        var deliveryStr = (0, util_1.replaceLineBreaks)((0, util_1.replaceWonFormat)($delivery.text()));
        var $authorWrap = $current.find(".user-info");
        var author = $authorWrap.children().first().text();
        var $timeWrap = $current.find("time");
        var timeStr = $timeWrap.attr("datetime");
        var time = new Date(timeStr);
        var $viewWrap = $current.find(".col-view");
        var viewStr = (0, util_1.replaceLineBreaks)((0, util_1.replaceSpaces)($viewWrap.text()));
        var $rateWrap = $current.find(".col-rate");
        var rateStr = (0, util_1.replaceLineBreaks)((0, util_1.replaceSpaces)($rateWrap.text()));
        var $thumbnailWrap = $current.find(".vrow-preview");
        var thumbnailUrl = "https:".concat($thumbnailWrap.children().first().attr("src"));
        var $url = $current.find(".preview-image");
        var url = "".concat(constant_1.ROOT_URL).concat($url.attr("href"));
        var article = {
            id: Number(id),
            title: title,
            time: time,
            author: author,
            view: (0, util_1.isOnlyNum)(viewStr) ? Number(viewStr) : 0,
            rate: (0, util_1.isOnlyNum)(rateStr) ? Number(rateStr) : 0,
            price: Number(priceStr),
            delivery: deliveryStr.includes("무료") ? 0 : Number(deliveryStr),
            store: store,
            category: category,
            thumbnailUrl: thumbnailUrl,
            url: url
        };
        articles.push(article);
    });
    return articles;
}
exports.parseHotDealList = parseHotDealList;
//# sourceMappingURL=parse.js.map
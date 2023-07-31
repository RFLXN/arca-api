"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceWonFormat = exports.replaceLineBreaks = exports.replaceSpaces = exports.isOnlyNum = void 0;
function isOnlyNum(str) {
    return /^\d+$/.test(str);
}
exports.isOnlyNum = isOnlyNum;
function replaceSpaces(str) {
    return str.replaceAll(" ", "");
}
exports.replaceSpaces = replaceSpaces;
function replaceLineBreaks(str) {
    return str.replace(/[\r\n]/gm, "");
}
exports.replaceLineBreaks = replaceLineBreaks;
function replaceWonFormat(str) {
    return str.replaceAll(",", "").replace("원", "");
}
exports.replaceWonFormat = replaceWonFormat;
//# sourceMappingURL=util.js.map
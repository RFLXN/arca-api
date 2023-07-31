function isOnlyNum(str: string) {
    return /^\d+$/.test(str);
}

function replaceSpaces(str: string) {
    return str.replaceAll(" ", "");
}

function replaceLineBreaks(str: string) {
    return str.replace(/[\r\n]/gm, "");
}

function replaceWonFormat(str: string) {
    return str.replaceAll(",", "").replace("원", "");
}

export {
    isOnlyNum, replaceSpaces, replaceLineBreaks, replaceWonFormat
};

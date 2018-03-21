let parse9 = function (input, char_count) {
    if (input.length != char_count) {
        throw new Error("Parsing is not possible. Wrong digit count.");
    }

    if (!input.match(/^[0-9]+$/)) {
        throw new Error("Parsing is not possible. Expected digit but found a different symbol.");
    }

    return parseInt(input);
};

let parseX = function (input, char_count) {
    if (input.length != char_count) {
        throw new Error("Parsing is not possible. Wrong character count.");
    }
    return input.replace(/[ ]+$/g, '');
};

module.exports = {
    parse9: parse9,
    parseX: parseX
};

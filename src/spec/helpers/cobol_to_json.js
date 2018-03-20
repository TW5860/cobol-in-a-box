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
    return input.replace(/[ ]+$/g,'');
};

let parseBuildings = function (input) {
    var buffer = input;

    function cut(count) {
        var cutted = buffer.substr(0, count);
        buffer = buffer.substr(count);
        return cutted;
    }

    var count = parse9(cut(2), 2);
    var buildings = [];
    for (var i = 0; i < count; i++) {
        var name = parseX(cut(25), 25);
        var height = parse9(cut(5), 5);
        buildings.push({'building_name': name, 'building_height': height});
    }

    if (buffer.length != 0) {
        throw new Error("Parsing is not possible. There are too many buildings in the array.");
    }

    return {'buildings': buildings};
};

module.exports = {
        parse9 : parse9,
        parseX : parseX,
        parseBuildings: parseBuildings};

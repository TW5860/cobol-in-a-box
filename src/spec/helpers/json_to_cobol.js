
let printBuilding = function () {

};

let print9 = function (number, char_count) {
    if(!Number.isInteger(number)){
        throw new Error("Could not print a value as number that is no number.");
    }
    let result = number.toString().padStart(char_count, '0');
    if (result.length != char_count) {
        throw new Error("Input number too long for copybook.");
    }
    return result;
};

let printX = function (str, char_count) {
    if (str.length > char_count) {
        throw new Error("Input string is too long for copybook.");
    }
    return str.padEnd(char_count, ' ');
};

module.exports = {
    printBuilding: printBuilding,
    print9: print9,
    printX: printX
};
let printBuilding = function (building) {
    if (!Number.isInteger(building.building_height), (typeof building.building_name !== 'string')) {
        throw new Error("Element in the array is not a valid building");
    }
    return printX(building.building_name, 25) + print9(building.building_height, 5);
};

let printBuildings = function (buildings) {
    let buildingsArray = buildings.buildings;
    if (!Array.isArray(buildingsArray)) {
        throw new Error("Element in the array is not a valid building");
    }
    return print9(buildingsArray.length, 2) + buildingsArray.map(printBuilding).join('');
};

let print9 = function (number, char_count) {
    if (!Number.isInteger(number)) {
        throw new Error("Could not print a value as number that is no number.");
    }
    let result = number.toString().padStart(char_count, '0');
    if (result.length != char_count) {
        throw new Error("Input number too long for copybook.");
    }
    return result;
};

let printX = function (str, char_count) {
    if (typeof str !== 'string') {
        throw new Error("Input is not a string");
    }
    if (str.length > char_count) {
        throw new Error("Input string is too long for copybook.");
    }
    return str.padEnd(char_count, ' ');
};

module.exports = {
    printBuildings: printBuildings,
    print9: print9,
    printX: printX
};
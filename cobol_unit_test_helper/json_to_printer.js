let {print9, printX} = require('./json_to_cobol');

let buildIntegerPrinter = function (dataSpecObj) {
    let length = dataSpecObj["maximum"].toString().length;
    return function (value) {
        return print9(value, length);
    };
};

let buildStringPrinter = function (dataSpecObj) {
    return function (value) {
        let length = dataSpecObj["maxLength"];
        return printX(value, length);
    };
};

let buildObjectPrinter = function (dataSpecObj) {

    const keys = Object.keys(dataSpecObj.properties);
    return function (inputObject) {

        let returnString = "";

        for (let i = 0; i < keys.length; i++) {
            let currentAttribute = dataSpecObj.properties[keys[i]];
            let printerFunction = buildPrinter(currentAttribute);
            returnString += printerFunction(inputObject[keys[i]]);
        }
        return returnString;
    }
};

let buildArrayPrinter = function (dataSpecObj) {
    let innerPrinter = buildPrinter(dataSpecObj.items);
    return function (value) {
        let returnString = "";
        let itemCountLength = dataSpecObj.maxItems.toString().length;
        returnString += print9(value.length, itemCountLength);
        for (let i = 0; i < value.length; i++) {
            returnString += innerPrinter(value[i]);
        }
        return returnString;
    }
}

function buildPrinter(dataSpecObj) {
    switch (dataSpecObj.type) {
        case 'integer':
            return buildIntegerPrinter(dataSpecObj);
        case 'string':
            return buildStringPrinter(dataSpecObj);
        case 'object':
            return buildObjectPrinter(dataSpecObj);
        case 'array':
            return buildArrayPrinter(dataSpecObj);
        default :
            throw new Error("Not a valid object type");
    }
}

module.exports = {
    buildPrinter: buildPrinter
};
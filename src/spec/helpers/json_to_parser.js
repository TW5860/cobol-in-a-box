let {parse9, parseX} = require('./cobol_to_json');

let buildIntegerParser = function (dataSpecObj) {
    let length = dataSpecObj["maximum"].toString().length;
    return function (inputStr) {
        return {
            'parsed': parse9(inputStr.substr(0, length), length),
            'length': length,
            'remainingString': inputStr.substr(length)
        };
    };
};

let buildStringParser = function (dataSpecObj) {
    return function (inputStr) {
        let length = dataSpecObj["maxLength"];
        return {
            'parsed': parseX(inputStr.substr(0, length), length),
            'length': length,
            'remainingString': inputStr.substr(length)
        };
    };
};

let buildObjectParser = function (dataSpecObj) {

    const keys = Object.keys(dataSpecObj.properties);
    return function (inputStr) {

        let returnObject = {};
        let remainingInput = inputStr;
        let length = 0;

        for (let i = 0; i < keys.length; i++) {
            let currentAttribute = dataSpecObj.properties[keys[i]];
            let parserFunction = buildParserInternal(currentAttribute);
            let recursiveResult = parserFunction(remainingInput);

            returnObject[keys[i]] = recursiveResult.parsed;
            remainingInput = recursiveResult.remainingString;
            length += recursiveResult.length;
        }
        return {
            'parsed': returnObject,
            'length': length,
            'remainingString': remainingInput
        };
    }
};

function buildParserInternal(dataSpecObj) {
    switch (dataSpecObj.type) {
        case 'integer':
            return buildIntegerParser(dataSpecObj);
        case 'string':
            return buildStringParser(dataSpecObj);
        case 'object':
            return buildObjectParser(dataSpecObj);
        default :
            throw new Error("Not a valid object type");
    }
}

function buildParser(dataSpecObj) {
    let internalParser = buildParserInternal(dataSpecObj);
    return function (inputStr) {
        let res = internalParser(inputStr);
        return res.parsed;
    }
}

module.exports = {
    buildParser: buildParser
};
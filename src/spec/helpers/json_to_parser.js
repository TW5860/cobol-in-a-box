let {parse9, parseX} = require('./cobol_to_json');

let buildIntegerParser = function (dataSpecObj) {
    let length = dataSpecObj["maximum"].toString().length;
    return function (inputStr) {
        return parse9(inputStr, length);
    };
};

let buildStringParser = function (dataSpecObj) {
    return function (inputStr) {
        return parseX(inputStr, dataSpecObj["maxLength"]);
    };
};

let buildObjectParser = function (dataSpecObj) {

    const keys = Object.keys(dataSpecObj.properties);
    return function (inputStr) {
        let buffer = inputStr;

        function cut(count) {
            let cutted = buffer.substr(0, count);
            buffer = buffer.substr(count);
            return cutted;
        }

        if (keys.length > 0) {
            let obj = {};
            for (let i = 0; i < keys.length; i++) {
                obj[keys[i]] = buildParser(dataSpecObj.properties[keys[i]])(cut(8));
            }
            return obj;
        }
        else {
            return {};
        }
    }
};

function buildParser(dataSpecObj) {
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

module.exports = {
    buildParser: buildParser
};
let {parse9} = require('./cobol_to_json');

function buildParser(dataSpecObj) {

    let length = dataSpecObj["maximum"].toString().length;
    return function (inputStr) {
        return parse9(inputStr, length);
    };
}

module.exports = {
    buildParser: buildParser
};
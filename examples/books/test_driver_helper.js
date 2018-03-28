let {exec} = require('child_process');
let fs = require('fs');
let {buildParser} = require('../../cobol_unit_test_helper/json_to_parser');
let {buildPrinter} = require('../../cobol_unit_test_helper/json_to_printer');

exports.execTestDriver = function (input, resultCallback) {
    let copybookSpecInput = JSON.parse(fs.readFileSync('examples/books/request-schema.json', 'utf8'));
    copybookSpecInput = copybookSpecInput["properties"]["WHATEVEROperation"];
    let copybookSpecOutput = JSON.parse(fs.readFileSync('examples/books/response-schema.json', 'utf8'));
    copybookSpecOutput = copybookSpecOutput["properties"]["WHATEVEROperationResponse"];

    let printFunc = buildPrinter(copybookSpecInput);
    let parseFunc = buildParser(copybookSpecOutput);

    let input_str = printFunc(input);
    exec(`echo "${input_str}" | examples/books/test_driver`, (err, stdout, stderr) => {
        if (err) {
            // command not found or something
            fail(err);
            return;
        }
        let responseObj = parseFunc(stdout.trim());

        resultCallback(responseObj);
    });
};

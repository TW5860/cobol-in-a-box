let {exec} = require('child_process');
let fs = require('fs');
let {buildParser} = require('./json_to_parser');
let {buildPrinter} = require('./json_to_printer');

exports.execTestDriver = function (input, resultCallback) {
    let copybookSpec = JSON.parse(fs.readFileSync('src/spec/copybook_json.json', 'utf8'));
    copybookSpec = copybookSpec["properties"]["WHATEVEROperation"];

    let printFunc = buildPrinter(copybookSpec);
    let parseFunc = buildParser(copybookSpec);

    let input_str = printFunc(input);
    exec(`echo "${input_str}" | ./test_driver`, (err, stdout, stderr) => {
        if (err) {
            // command not found or something
            fail(err);
            return;
        }

        let buildingsObj = parseFunc(stdout.trim());

        resultCallback(buildingsObj);
    });
};
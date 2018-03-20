let { exec } = require('child_process');
let { parseBuildings } = require('./cobol_to_json');
let { printBuildings } = require('./json_to_cobol');

exports.execTestDriver = function (input, resultCallback) {
    let input_str = printBuildings(input);
    exec(`echo "${input_str}" | ./test_driver`, (err, stdout, stderr) => {
        if (err) {
          // command not found or something
          fail(err);
          return;
        }

        let buildingsObj = parseBuildings(stdout.trim());

        resultCallback(buildingsObj);
    });
};
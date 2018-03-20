let { exec } = require('child_process');
let { parseBuildings } = require('./cobol_to_json');

exports.execTestDriver = function (input, resultCallback) {
    exec(`echo "${input}" | ./test_driver`, (err, stdout, stderr) => {
        if (err) {
          // command not found or something
          fail(err);
          return;
        }

        let buildingsObj = parseBuildings(stdout.trim());

        resultCallback(buildingsObj);
    });
};
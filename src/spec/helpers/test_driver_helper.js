let { exec } = require('child_process');

exports.execTestDriver = function (input, resultCallback) {
    exec(`echo "${input}" | ./test_driver`, (err, stdout, stderr) => {
        if (err) {
          // command not found or something
          fail(err);
          return;
        }
        resultCallback(stdout.trim());
    });
};
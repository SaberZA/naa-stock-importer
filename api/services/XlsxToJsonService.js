var Promise = require('bluebird');

module.exports = {
    convert: function(fileData, outputFilePath) {
        var xlsxToJson = Promise.promisify(require("xlsx-to-json-lc"));

        return xlsxToJson({
            input: fileData,
            output: outputFilePath
        });
    }
}
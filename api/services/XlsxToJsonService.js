var Promise = require('bluebird');
var xlsxToJson = Promise.promisify(require("xlsx-to-json"));

module.exports = {
    convert: function(fileData, outputFilePath) {
        return xlsxToJson({
            input: fileData,
            output: outputFilePath
        });
    }
}
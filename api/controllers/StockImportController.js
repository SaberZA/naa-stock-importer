/**
 * StockImportController
 *
 * @description :: Server-side logic for managing stockimports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var xlsxj = require("xlsx-to-json");

module.exports = {
	upload: function(req, res) {
        req.file('stockFile').upload(function(err, files) {
            if(err) {
                res.serverError(err);
            }

            if(!files[0].fd.toLowerCase().endsWith('.xlsx')) {
                res.serverError('invalid upload format!');
            }

            xlsxj({
                input: files[0].fd, 
                output: "stock.json"
            }, function(err, result) {
                if(err) {
                console.error(err);
                }else {
                console.log(result);
                }
            });


            return res.json({
                message: files.length + ' file(s) uploaded successfully',
                files: files
            });
        });
    }
};


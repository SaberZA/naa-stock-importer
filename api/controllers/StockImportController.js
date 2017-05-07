/**
 * StockImportController
 *
 * @description :: Server-side logic for managing stockimports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');
var xlsxj = require("xlsx-to-json-lc");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('temp-db.sqlite');

module.exports = {
    parseJson: function(req,res) {
        var jsonStringArray = fs.readFile("stock.json", function(err, data) {
            if(err) {
                res.serverError(err);
            }
            var stockArray = JSON.parse(jsonStringArray);

            var messages = {
                data: []
            };

            stockArray.forEach(function(element) {
                // console.log(element);
                messages.data.push(element);
            }, this);
            
            res.json({
                message: messages
            });
        }); 
    },
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
                    res.serverError(err);
                }else {
                    // console.log(result);
                    // try {
                    //     var jsonStringArray = fs.readFile("stock.json", function(err, data) {
                    //         if(err) {
                    //             res.serverError(err);
                    //         }
                    //         var stockArray = JSON.parse(jsonStringArray);

                    //         db.serialize(function() {
                    //             db.run("CREATE TABLE IF NOT EXISTS \"StockItem\"( " +
                    //                 "\StockCode\" varchar ," +
                    //                 "\"BarCode\" varchar ," +
                    //                 "\"StockDescription\" varchar ," +
                    //                 "\"StockQuantity\" integer ," +
                    //                 "\"StockPrice\" varchar ," +
                    //                 "\"DateUpdated\" varchar ," +
                    //                 "\"DateUpdatedActual\" datetime );");

                    //             stockArray.forEach(function(element) {
                    //                 console.log(element);
                    //             }, this);
                    //         }); 
                    //         db.close();    
                    //     });                          
                    // }
                    // catch (err) {
                    //     db.close(); 
                    // }
                }
            });


            return res.json({
                message: files.length + ' file(s) uploaded successfully',
                files: files
            });
        });
    }
};


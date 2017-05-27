/**
 * StockImportController
 *
 * @description :: Server-side logic for managing stockimports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');
var xlsxj = require("xlsx-to-json");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('temp-db.sqlite');
var path = require('path');

module.exports = {
  parseJson: function (req, res) {
    var jsonStringArray = fs.readFile("stock.json", function (err, data) {
      if (err) {
        return res.serverError(err);
      }
      var stockArray = JSON.parse(data);

      res.json(stockArray);
    });
  },
  upload: function (req, res) {
    req.file('stockFile').upload(function (err, files) {
      if (err) {
        return res.serverError(err);
      }

      if (!files[0].fd.toLowerCase().endsWith('.xlsx')) {
        return res.serverError('invalid upload format!');
      }

      // var folder = "imports";
      var todayString = DateService.dateToday();
      var outputFileName = path.resolve(__dirname, "stock-" + todayString + ".json");

      XlsxToJsonService.convert(files[0].fd, outputFileName)
        .then(StockListingDbService.saveStockListing)
        .then(function (listingRecord) {

          return res.view('importComplete', {
            title: 'Stock Importer',
            message: files.length + ' file(s) uploaded successfully',
            files: files
          });
        }).catch(function (err) {
          sails.log('Server Error has occurred: ' + err);
          return res.serverError(err);
        });
    });
  },
  downloadLatest: function (req, res) {
    var filePath = path.resolve(__dirname, '../../stock.json');
    fs.readFile(filePath, function (err, fileData) {
      if (err) {
        return res.serverError(err);
      }
      res.attachment('stock.json');
      return res.send(200, fileData)
    });
  }
};

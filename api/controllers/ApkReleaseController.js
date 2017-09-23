/**
 * ApkReleaseViewController
 *
 * @description :: Server-side logic for managing Apkreleaseviews
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Dropbox = require('dropbox');
var dbx = new Dropbox({ accessToken: 'GRYOSTKmxi4AAAAAAAABbqv2hI0d2OxAp_HOdu3dSveTFH6l-z4bX_kSDZ0pAswc' });

var node_dropbox = require('node-dropbox');
var Promise = require('bluebird');
var api = node_dropbox.api('GRYOSTKmxi4AAAAAAAABbqv2hI0d2OxAp_HOdu3dSveTFH6l-z4bX_kSDZ0pAswc');
api.getFile = Promise.promisify(api.getFile);

module.exports = {
    getApkReleaseFolder: function(req,res) {        
        dbx.filesListFolder({path: ''})
        .then(function(response) {
            var files = [];
            response.entries.forEach(function(entry) {
                if(entry[".tag"] == "file") {
                    entry.downloadLink = "/downloadApk/"+entry.name;                    
                    files.push(entry);
                };
            });
            return res.view('viewApkReleases', {
                files: files
            });
        })
        .catch(function(error) {
            return res.serverError(err);
        });
    },
    downloadApk: function(req,res) {
        
        api.getFile("/"+req.param('fileName'))
        .then(function(err, data) {
            res.attachment(req.param('fileName'));
            return res.send(200, data);
        }).catch(function(error) {
            return res.serverError(err);
        });



        // dbx.filesDownload({
        //     path: "/"+req.param('fileName')
        // }).then(function(data) {
        //     res.attachment(data.name);
        //     return res.send(200, data.fileBinary);
        // }).catch(function(error) {
        //     return res.serverError(err);
        // });
    }
}

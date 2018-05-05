var https = require('https');
var request = require('request');

module.exports = {
    triggerBuild: function(buildConfig) {

        var queryString = "https://" + buildConfig.vsOnlineInstance + "/DefaultCollection/" + buildConfig.project + "/_apis/build/builds?api-version=4.1";
        const rawData = {
            "definition": {
                "id": buildConfig.definitionId
            },
            "sourceBranch": "refs/heads/" + buildConfig.branchName
        };
        // const postData = JSON.stringify(rawData);
        // // const postData = JSON.stringify({definition:{id:"1"},sourceBranch:"refs/heads/master"});
        // var options = {
        //     hostname: buildConfig.vsOnlineInstance,
        //     path: "/DefaultCollection/" +buildConfig.project + "/_apis/build/builds?api-version=2",
        //     method: "POST",
        //     headers: {
        //         "Authorization": "Basic " + buildConfig.base64EncodedCredential,
        //         "Content-Type": "application/json"                        
        //     }
        // };

        // var myJSONObject = { ... };
        request({
            url: queryString,
            headers: {
                "Authorization" : "Basic " + buildConfig.base64EncodedCredential,
                "Content-Type": "application/json"
            },
            method: "POST",
            json: true,   // <--Very important!!!
            body: rawData
        }, function (error, response, body){
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        });

        // sails.log("[OPTIONS]: " + JSON.stringify(options));

        // var request = https.request(options, (res) => {
        //     sails.log("[STATUS]: " + res.statusCode);
        //     sails.log("[HEADERS]: " + JSON.stringify(res.headers));
        //     sails.log("[STATUS_MESSAGE]: " + res.statusMessage);
        //     sails.log("[vsOnlineInstance]: " + buildConfig.vsOnlineInstance);
        //     sails.log("[project]: " + buildConfig.project);
        //     sails.log("[definitionId]: " + buildConfig.definitionId);
        //     sails.log("[branchName]: " + buildConfig.branchName);
        //     sails.log("[base64EncodedCredential]: " + buildConfig.base64EncodedCredential);
        //     res.setEncoding('utf8');
        //     res.on('data', function (chunk) {
        //         console.log('BODY: ' + chunk);
        //       });;
        //     sails.log("-----------");
        // });

        // request.on("error", (err) => {
        //     sails.log('Server Error has occurred: ' + err);
        // });

        // sails.log("[POSTDATA]: " + postData);
        // request.write(postData);
        // request.end();
    }
}
var https = require('https');

module.exports = {
    triggerBuild: function(buildConfig) {

        var queryString = "https://" + buildConfig.vsOnlineInstance + "/DefaultCollection/" + buildConfig.project + "/_apis/build/builds?api-version=2";
        const postData = JSON.stringify({
            "definition": {
                "id": buildConfig.definitionId
            },
            "sourceBranch": "refs/heads/" + buildConfig.branchName
        });
        var options = {
            hostname: buildConfig.vsOnlineInstance,
            path: "/DefaultCollection/" +buildConfig.project + "/_apis/build/builds?api-version=2",
            method: "POST",
            headers: {
                "Authorization": "Basic " + buildConfig.base64EncodedCredential,
                "Content-Type": "application/json"                        
            }
        };

        var request = https.request(options, (res) => {
            sails.log("[STATUS]: " + res.statusCode);
            sails.log("[HEADERS]: " + JSON.stringify(res.headers));
            sails.log("[vsOnlineInstance]: " + buildConfig.vsOnlineInstance);
            sails.log("[project]: " + buildConfig.project);
            sails.log("[definitionId]: " + buildConfig.definitionId);
            sails.log("[branchName]: " + buildConfig.branchName);
            sails.log("[base64EncodedCredential]: " + buildConfig.base64EncodedCredential);
            sails.log("-----------");
        });

        request.on("error", (err) => {
            sails.log('Server Error has occurred: ' + err);
        });

        request.write(postData);
        request.end();
    }
}
// Set the configuration settings
const credentials = {
    client: {
        id: '141825382970-8bf4vdki314l5pq157ps1oopbinf60vu.apps.googleusercontent.com',
        secret: '_O75nlGzSbhw1zi5cY0Jw3-_'
    },
    auth: {
        tokenHost: 'https://www.googleapis.com/auth/drive'
    }
};

// Initialize the OAuth2 Library
const oauth2 = require('simple-oauth2').create(credentials);

module.exports = {
    getOAuthAccess: function(req,res) {
        // Authorization oauth2 URI 
        const authorizationUri = oauth2.authorizationCode.authorizeURL({
            redirect_uri: 'http://localhost:1337/api/oauth-callback',
            scope: '<scope>',
            state: '<state>'
        });

        // Redirect example using Express (see http://expressjs.com/api.html#res.redirect)
        res.redirect(authorizationUri);
        
        // Get the access token object (the authorization code is given from the previous step).
        const tokenConfig = {
            code: '<code>',
            redirect_uri: 'http://localhost:1337/api/oauth-callback'
        };

        // Callbacks
        // Save the access token
        // oauth2.authorizationCode.getToken(tokenConfig, (error, result) => {
        // if (error) {
        //     return console.log('Access Token Error', error.message);
        // }

        // const token = oauth2.accessToken.create(result);
        // });

        // Promises
        // Save the access token
        return oauth2.authorizationCode.getToken(tokenConfig)
            .then((result) => {
                const token = oauth2.accessToken.create(result);
            });
            // .catch((error) => {
            //     sails.log('Access Token Error', error.message);
            // });


    }
}
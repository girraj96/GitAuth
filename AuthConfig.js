export default {
    clientId: '760259aaee5273a3836a',
    clientSecret: '5e87e925a5b1a6651409f606abddf1d72986e6a6',
    redirectUrl: 'mygithubapp://oauth',
    scopes: ['user', 'repo'],
    serviceConfiguration: {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
        revocationEndpoint: 'https://github.com/settings/connections/applications/760259aaee5273a3836a'
    }
};

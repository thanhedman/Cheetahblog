var twitterAPI = require('node-twitter-api');
var connect = require('connect');
var twitter = new twitterAPI({
    consumerKey: 'your consumer Key',
    consumerSecret: 'your consumer secret',
    callback: 'http://cheetahblog.com/flow'
});

twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if (error) {
        console.log("Error getting OAuth request token : " + error);
    } else {
        
    }
});
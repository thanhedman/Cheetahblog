var querystring = require("querystring");
var fs = require("fs");
var path = require('path');

function welcome(response, postData, pathname, request) {
	loadStatic(response, postData, "/welcome.html");
}

function start(response, postData, pathname, request) {
	var twitterAPI = require('node-twitter-api');
	var connect = require('connect');
	var sess = request.session;
	var twitter = new twitterAPI({
		consumerKey: 'fSORn4SdW6ZLSGHkT8baa6VlT',
		consumerSecret: 'pv8s43M2eL5tkcmwcKJVMeB5uq9nszVCSH8h343TBuwGbEq8W0',
		callback: 'http://54.219.148.68/flow'
	});

	twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
		if (error) {
			console.log("Error getting OAuth request token : " + error);
		} else {
			//store requestToken and requestTokenSecret in session
			sess.requestToken = requestToken;
			sess.requestTokenSecret = requestTokenSecret;
			console.log("OAuth token: " + requestToken + " and secret: " + requestTokenSecret);
			response.writeHead(302, {"Location": "https://twitter.com/oauth/authenticate?oauth_token="+requestToken });
			response.end();
		}
	});
}

function flow(response, postData, pathname, request, getData) {
	var twitterAPI = require('node-twitter-api');
	var connect = require('connect');
	var sess = request.session;

	// Redirect if we already have an access token
	if(sess.accessToken != null) {
		response.writeHead(302, {"Location": "/sheet" });
		response.end();
	}

	else {
		//oauth_verifier is stored in GET, requestToken and requestTokenSecret are stored in session
		requestToken = sess.requestToken;
		requestTokenSecret = sess.requestTokenSecret;
		oauth_verifier = getData.oauth_verifier
		console.log("oauth_verifier: " + oauth_verifier);
		var twitter = new twitterAPI({
			consumerKey: 'fSORn4SdW6ZLSGHkT8baa6VlT',
			consumerSecret: 'pv8s43M2eL5tkcmwcKJVMeB5uq9nszVCSH8h343TBuwGbEq8W0',
			callback: 'http://54.219.148.68/flow'
		});
		twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
			if (error) {
				console.log(error);
			} else {
				//store accessToken and accessTokenSecret in session
				sess.accessToken = accessToken;
				sess.accessTokenSecret = accessTokenSecret;

				response.writeHead(302, {"Location": "/sheet" });
				response.end();
			}
		});
	}
}

function sheet(response, postData, pathname, request) {
	loadStatic(response, postData, "/sheet.html");
}

function tweet(response, postData, pathname, request) {
	var twitterAPI = require('node-twitter-api');
	var twitter = new twitterAPI({
		consumerKey: 'fSORn4SdW6ZLSGHkT8baa6VlT',
		consumerSecret: 'pv8s43M2eL5tkcmwcKJVMeB5uq9nszVCSH8h343TBuwGbEq8W0',
		callback: 'http://54.219.148.68/flow'
	});
	tweet = querystring.parse(postData).argument;
	//console.log("Tweet '" + tweet + "' submitted");
	var connect = require('connect');
	var sess = request.session;
	sess.twitter++;
	sess.lastTweet = tweet;

	accessToken = sess.accessToken;
	accessTokenSecret = sess.accessTokenSecret;
	twitter.statuses("update", {
        status: tweet
    },
    accessToken,
    accessTokenSecret,
    function(error, data, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Tweeted");
        }
    }
	);
	response.writeHead(200, {"Content-Type": "application/json"});
	response.write("{status: twitter success}");
	response.end();
}

function loadStatic(response, postData, pathname) {
	path = "./www" + pathname;
	fs.readFile(path, function (err, data) {
		if (err) throw err;
		//console.log("static HTML page " + pathname + " called");
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
	});
}

function loadJs(response, postData, pathname) {
	path = "." + pathname;
	fs.readFile(path, function (err, data) {
		if (err) throw err;
		//console.log("javascript " + pathname + " called");
		response.writeHead(200, {"Content-Type": "text/javascript"});
		response.write(data);
		response.end();
	});
}

function loadCss(response, postData, pathname) {
	path = "." + pathname;
	fs.readFile(path, function (err, data) {
		if (err) throw err;
		//console.log("css " + pathname + " called");
		response.writeHead(200, {"Content-Type": "text/css"});
		response.write(data);
		response.end();
	});
}

exports.start = start;
exports.loadJs = loadJs;
exports.loadStatic = loadStatic;
exports.loadCss = loadCss;
exports.flow = flow;
exports.sheet = sheet;
exports.tweet = tweet;
exports.welcome = welcome;


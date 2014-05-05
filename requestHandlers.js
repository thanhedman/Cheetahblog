var querystring = require("querystring");
var fs = require("fs");

function start(response, postData) {
	/*
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
			//store requestToken and requestTokenSecret in session
			response.writeHead(302, {"Location": "https://twitter.com/oauth/authenticate?oauth_token="+requestToken });
		}
	});
	*/
}

function flow(response, postData) {
	/*
	//oauth_verifier is stored in GET, requestToken and requestTokenSecret are stored in session
	twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
		if (error) {
			console.log(error);
		} else {
			//store accessToken and accessTokenSecret in session      
		}
	});
	*/
	loadStatic(response, postData, "/flow.html");
}

function tweet(response, postData) {
	tweet = querystring.parse(postData).argument;
	console.log("Tweet '" + tweet + "' submitted");
	/*
	twitter.statuses("update", {
        status: tweet
    },
    accessToken,
    accessTokenSecret,
    function(error, data, response) {
        if (error) {
            response.writeHead(200, {"Content-Type": "application/json"});
			response.write("{status: twitter error, error: " + error + "}");
			response.end();
        } else {
            response.writeHead(200, {"Content-Type": "application/json"});
			response.write("{status: twitter success, data: " + data + "}");
			response.end();
        }
    }
	);
	*/
	response.writeHead(200, {"Content-Type": "application/json"});
	response.write("{status: twitter success}");
	response.end();
}

function loadStatic(response, postData, pathname) {
	path = "." + pathname;
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
exports.tweet = tweet;


var http = require("http");
var connect = require("connect");
var url = require("url");



function start(route, handle) {
function onRequest(req, res, next) {
	var postData = "";
	var pathname = url.parse(req.url).pathname;
	var sess = req.session;

	//console.log("Count: " + sess.twitter + " last Tweet: " + sess.lastTweet);
	
	req.setEncoding("utf8");
	
	req.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
		//console.log("Received POST data chunk '" + postDataChunk + "'.");
	});
	
	req.addListener("end", function() {
		route(pathname, handle, res, postData, req);
	});
	
}

	cheetah = connect.createServer();
	cheetah.use(connect.cookieParser());
	cheetah.use(connect.cookieSession({secret: 'Tschida!'}));
	cheetah.use(onRequest);
	cheetah.listen(80);
	console.log("Server has started.");
}

exports.start = start;

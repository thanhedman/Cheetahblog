var querystring = require("querystring");
var fs = require("fs");

function start(response, postData) {
	console.log("Start called");
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<html><head><link rel='stylesheet' href='/assets/css/flipclock.css'></head><body><h1>Cheetah Blog</h1><br><h3>Time-sensitive live microblogging for debate</h3><br><p>You're viewing the Start page.</p><div class='clock'></div><script src='/assets/js/libs/jquery.js'></script><script src='/assets/js/flipclock.min.js'></script><script src='/assets/js/clock.js'></script></body></html>");
	response.end();
}

function upload(response, postData) {
	console.log("Upload called");
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<h1>Cheetah Blog</h1><br><h3>Time-sensitive live microblogging for debate</h3><br><p>You're viewing the Upload page. You sent the text '" + querystring.parse(postData).text + "' .</p>");
	response.end();
}

function loadStatic(response, postData, pathname) {
	path = "." + pathname;
	fs.readFile(path, function (err, data) {
		if (err) throw err;
		console.log("static HTML page " + pathname + " called");
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
	});
}

function loadJs(response, postData, pathname) {
	path = "." + pathname;
	fs.readFile(path, function (err, data) {
		if (err) throw err;
		console.log("javascript " + pathname + " called");
		response.writeHead(200, {"Content-Type": "text/javascript"});
		response.write(data);
		response.end();
	});
}

function loadCss(response, postData, pathname) {
	path = "." + pathname;
	fs.readFile(path, function (err, data) {
		if (err) throw err;
		console.log("css " + pathname + " called");
		response.writeHead(200, {"Content-Type": "text/css"});
		response.write(data);
		response.end();
	});
}

exports.start = start;
exports.upload = upload;
exports.clock = clock;
exports.flipClock = flipClock;
exports.flipClockCss = flipClockCss;
exports.jquery = jquery;
exports.loadJs = loadJs;
exports.loadStatic = loadStatic;
exports.loadCss = loadCss;


var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle[""] = requestHandlers.welcome;
handle["/"] = requestHandlers.welcome;
handle["/welcome"] = requestHandlers.welcome;
handle["/welcome.html"] = requestHandlers.welcome;
handle["/start"] = requestHandlers.start;
handle["/flow.html"] = requestHandlers.flow;
handle["/flow"] = requestHandlers.flow;
handle["/sheet"] = requestHandlers.sheet;
handle['/tweet'] = requestHandlers.tweet;

handle["/assets/js/clock.js"] = requestHandlers.loadJs;
handle["/assets/js/flow.js"] = requestHandlers.loadJs;
handle['/assets/css/flow.css'] = requestHandlers.loadCss;

handle['/assets/css/lib.css'] = requestHandlers.loadCss;
handle['/assets/js/lib.js'] = requestHandlers.loadJs;

server.start(router.route, handle);
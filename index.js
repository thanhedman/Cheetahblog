var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle[""] = requestHandlers.welcome;
handle["/"] = requestHandlers.welcome;
handle["/welcome"] = requestHandlers.welcome;
handle["/welcome.html"] = requestHandlers.welcome;
handle["/start"] = requestHandlers.start;
handle["/assets/js/clock.js"] = requestHandlers.loadJs;
handle["/assets/css/flipclock.css"] = requestHandlers.loadCss;
handle["/assets/js/flipclock.min.js"] = requestHandlers.loadJs;
handle["/assets/js/libs/jquery.js"] = requestHandlers.loadJs;
handle["/flow.html"] = requestHandlers.flow;
handle["/flow"] = requestHandlers.flow;
handle["/assets/js/flow.js"] = requestHandlers.loadJs;
handle['/assets/css/bootstrap.css'] = requestHandlers.loadCss;
handle['/assets/css/flow.css'] = requestHandlers.loadCss;
handle['/assets/js/bootstrap.min.js'] = requestHandlers.loadJs;
handle['/tweet'] = requestHandlers.tweet;

server.start(router.route, handle);
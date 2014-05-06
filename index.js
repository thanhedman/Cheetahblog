var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle[""] = requestHandlers.flow;
handle["/"] = requestHandlers.flow;
handle["/start"] = requestHandlers.flow;
handle["/upload"] = requestHandlers.upload;
handle["/assets/js/clock.js"] = requestHandlers.loadJs;
handle["/assets/css/flipclock.css"] = requestHandlers.loadCss;
handle["/assets/js/flipclock.min.js"] = requestHandlers.loadJs;
handle["/assets/js/libs/jquery.js"] = requestHandlers.loadJs;
handle["/start.html"] = requestHandlers.loadStatic;
handle["/flow.html"] = requestHandlers.loadStatic;
handle["/flow"] = requestHandlers.flow;
handle["/assets/js/flow.js"] = requestHandlers.loadJs;
handle["/tweet"] = requestHandlers.tweet;
handle['/assets/css/bootstrap.css'] = requestHandlers.loadCss;
handle['/assets/css/flow.css'] = requestHandlers.loadCss;
handle['/assets/js/bootstrap.min.js'] = requestHandlers.loadJs;

server.start(router.route, handle);
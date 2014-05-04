var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/assets/js/clock.js"] = requestHandlers.loadJs;
handle["/assets/css/flipclock.css"] = requestHandlers.loadCss;
handle["/assets/js/flipclock.min.js"] = requestHandlers.loadJs;
handle["/assets/js/libs/jquery.js"] = requestHandlers.loadJs;
handle["/start.html"] = requestHandlers.loadStatic;

server.start(router.route, handle);
function route(pathname, handle, response, postData, request) {
  //console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
	handle[pathname](response, postData, pathname, request);
  } else {
	//console.log("No handler found for " + pathname);
	response.writeHead(404, {"Content-Type": "text/html"});
	response.write("<h1>404 Not Found</h1>");
	response.end();
  }
}

exports.route = route;
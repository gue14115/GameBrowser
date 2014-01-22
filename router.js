function route(open, pathname, response, request, show) {
	console.log("About to route a request for " + pathname);
    open(response, request, pathname, show);
}
exports.route = route;
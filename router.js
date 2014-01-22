function route(open, pathname, response, request, showIndexContentAndCreateCookies, showIndexContentAndReuseCookies, showContentAndCreateCookies, showContentAndReuseCookies) {
	console.log("About to route a request for " + pathname);
    open(response, request, pathname, showContentAndCreateCookies, showContentAndReuseCookies);
}
exports.route = route;
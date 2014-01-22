function route(handle, pathname, response, request, showIndexContentAndCreateCookies, showIndexContentAndReuseCookies, showContentAndCreateCookies, showContentAndReuseCookies) {
	console.log("About to route a request for " + pathname); 
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, request, showIndexContentAndCreateCookies, showIndexContentAndReuseCookies);
	} else {
		handle["dynamic"](response, request, pathname, showContentAndCreateCookies, showContentAndReuseCookies);
	}
}
exports.route = route;
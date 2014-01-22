var http = require("http"); var url = require("url");

//Called when the server starts
function start(route, open, showIndexContentAndCreateCookies, showIndexContentAndReuseCookies, showContentAndCreateCookies, showContentAndReuseCookies) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;

		//console.log("Request for " + pathname + " received.");
		//Route to requested page
		route(open, pathname, response, request, showIndexContentAndCreateCookies, showIndexContentAndReuseCookies, showContentAndCreateCookies, showContentAndReuseCookies);
	}
  	http.createServer(onRequest).listen(8888);
  	console.log("Server has started.");
}
exports.start = start;
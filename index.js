var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var viewer = require("./viewer");

var handle = {}
//Says that if we receive / we should use the start function of the module requesthandlers
//handle["/"] = requestHandlers.start; deprecated
handle["/"] = requestHandlers.start;
//help DEPRECATED
//handle["/help.html"] = requestHandlers.open;
//About DEPRECATED
//handle["/about.html"] = requestHandlers.open;
//Check for each file individually
handle["dynamic"] = requestHandlers.open;
server.start(router.route, handle, viewer.showIndexContentAndCreateCookies,viewer.showIndexContentAndReuseCookies, viewer.showContentAndCreateCookies, viewer.showContentAndReuseCookies);
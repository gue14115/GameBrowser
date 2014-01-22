var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var viewer = require("./viewer");

open = requestHandlers.open;
server.start(router.route, open, viewer.showContentAndCreateCookies, viewer.showContentAndReuseCookies);
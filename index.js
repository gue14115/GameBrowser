var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var viewer = require("./viewer");
var postHandlers = require("./postHandlers");

var postHandle = {};
postHandle["login"] = postHandlers.login;

open = requestHandlers.open;
server.start(router.route, open, viewer.show, postHandle);
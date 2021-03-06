var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var viewer = require("./viewer");
var postHandlers = require("./postHandlers");

var postHandle = {};
postHandle["login"] = postHandlers.login;
postHandle["logout"] = postHandlers.logout;
postHandle["greet"] = postHandlers.greet;
postHandle["getTradeHubGames"] = postHandlers.getTradeHubGames;

open = requestHandlers.open;
server.start(router.route, open, viewer.show, postHandle);
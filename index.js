var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var viewer = require("./viewer");

var handle = {}
//Says that if we receive / we should use the start function of the module requesthandlers
handle["/"] = requestHandlers.start;
//help
handle["/help.html"] = requestHandlers.open;
//About
handle["/about.html"] = requestHandlers.open;

server.start(router.route, handle, viewer.content, viewer.other);
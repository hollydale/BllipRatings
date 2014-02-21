var server = require("./server_test");
var router = require("./router_test");

server.start(router.route);

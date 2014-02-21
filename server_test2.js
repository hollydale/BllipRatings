
var http = require("http");
var url = require("url");
var querystring = require("querystring");

function start(route) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		var query = url.parse(request.url).query;				
		console.log("Request for " + pathname + " received.");
		console.log(query);	
		route(pathname);

		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello World");
		response.end();
	}

	http.createServer(onRequest).listen(8080);
	console.log("Server has started.");
}

exports.start = start;

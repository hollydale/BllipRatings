var databaseUrl = "BllipRatings";
var mongojs = require('mongojs');
var db = mongojs(databaseUrl);


var http = require("http");
var url = require("url");
var querystring = require("querystring");

function start(route) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		var query = url.parse(request.url).query;				
		var aWineID = String("a" + query);
		console.log("Request for " + pathname + " received.");
		console.log(query + "   " + aWineID);	
		route(pathname);

		

		var mycollection = db.collection(aWineID);
		mycollection.find({avg: 1}, {_id: 0}, function(err, aWineID){
			if( err || !aWineID) console.log("No average found");
			else aWineID.forEach( function(OutputAvg) {
				console.log(OutputAvg);
				console.log(JSON.stringify(OutputAvg));
				response.writeHead(200, {"Content-Type": "text/plain"});
		                response.write(JSON.stringify(femaleUser));
				response.end();

			});
		});
	}

	http.createServer(onRequest).listen(8080);
	console.log("Server has started.");
}

exports.start = start;

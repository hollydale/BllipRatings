var http = require("http");
var url = require("url");
var querystring = require("querystring");

function start(route) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		var query = url.parse(request.url).query;				
		var aWineID = "a" + query;
		console.log("Request for " + pathname + " received.");
		console.log(query + "   " + aWineID);	
		route(pathname);

		
		var databaseUrl = "BllipRatings";
		var collections = ["a70ca2571e1fd4fd79e44c4024995bbe9"]
		var db = require("mongojs").connect(databaseUrl, collections);
		db.a70ca2571e1fd4fd79e44c4024995bbe9.find({avg: 1}, {_id: 0}, function(err, a70ca2571e1fd4fd79e44c4024995bbe9){
			if( err || !a70ca2571e1fd4fd79e44c4024995bbe9) console.log("No average found");
			else a70ca2571e1fd4fd79e44c4024995bbe9.forEach( function(femaleUser) {
				console.log(femaleUser);
				console.log(JSON.stringify(femaleUser));
				response.writeHead(200, {"Content-Type": "text/plain"});
		                response.write(JSON.stringify(femaleUser));
				response.end();

			});
		});
//		response.writeHead(200, {"Content-Type": "text/plain"});
//		response.write("Hello World");
//		response.end();
	}

	http.createServer(onRequest).listen(8080);
	console.log("Server has started.");
}

exports.start = start;

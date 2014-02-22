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
		var queryparse = querystring.parse(query);
		var aWineID = String("a" + queryparse.WineID);
		var WineRating = String(queryparse.WineRating);
		console.log("Request for " + pathname + " received.");
		console.log( "WineID:   " + aWineID);	
		console.log( "WineRating:  " +WineRating);
		route(pathname);

		
		if(String(pathname) == "/Ratings"){

			console.log("Looking for Ratings  ");		
			var mycollection = db.collection(aWineID);
			mycollection.find({avg: 1}, {_id: 0}, function(err, aWineID){
				if( err || !aWineID) console.log("No average found");
				else aWineID.forEach( function(OutputAvg) {
					console.log(JSON.stringify(OutputAvg));
					response.writeHead(200, {"Content-Type": "text/plain"});
		                	response.write(JSON.stringify(OutputAvg));
					response.end();

				});
			});
		}

		if(String(pathname) == "/AddRating"){
			var mycollection = db.collection(aWineID);
			mycollection.save({rating : WineRating}, function(err, saved){
				if( err|| !saved) console.log("Rating not saved");
				else console.log("Rating saved");
			});

			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write("Rating of " + WineRating + " saved to database");
			response.end();


		}

	}
	http.createServer(onRequest).listen(8080);
	console.log("Server has started.");
}

exports.start = start;

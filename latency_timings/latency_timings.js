var fs = require('fs');
var rl = require('readline');

main();

function main() {
   
   //Check if there is a command line attribute
   if (process.argv[2]) {
    
	   var fileName = process.argv[2];
	 
	   //console.log("Processing file " + fileName + " ...");
  
	   var lineReader = rl.createInterface({
		     input: fs.createReadStream(fileName)
	   });

	   lineReader.on('line', function (line) {
		
	       var tsIndicator = "2016-04-18 21:48:57.342"
	       var indicator = "com.couchbase.client.core.event.consumers.LoggingConsumer=>info";
	       var idx = line.indexOf(indicator);

	       if (idx != -1) {
	       	       
		       var ts = line.substring(0, tsIndicator.length);
		       var metrics = line.substring(idx+indicator.length+3, line.length);
		       var metricsJson = {};
		       metricsJson = JSON.parse(metrics);
		       metricsJson.time=ts;
		       
		       if (metricsJson.event.name === "NetworkLatencyMetrics") {

		       		for( var host in metricsJson){
				  
			           //Exclude the event descriptor
			           if ( host != "event" && host != "time") {
			           	   
				       var protocols = metricsJson[host];

				       for ( var protocol in protocols ) {

					       if ( protocol == "BINARY" ) {
						      
						      var requests = protocols[protocol];

						      for (var request in requests) {	      

							      var succ = requests[request].SUCCESS

							      if (succ) {

								  process.stdout.write(ts + ";" + host + ";"  + request + ";");

								  var perc = succ.metrics.percentiles;
								  
								  if (perc) {

								  	for (var p in perc) {
										process.stdout.write("perc_"+p + ";" + perc[p] + ";");
									}	
								  }
								  
								  
								  var min = succ.metrics.min;
								  var max = succ.metrics.max;
								  var count = succ.metrics.count;

								  if (min && max && count) {

									  process.stdout.write("min;" + min + ";");
									  process.stdout.write("max;" + max + ";");
									  process.stdout.write("count;" + count + ";"); 
								  }

								  process.stdout.write("\n");
							      }
						      } 
					       }
				       }
				   }
				}
		       }
	       }
	   });
	     
   } else {
	   usage();
   }
}

function usage() {

	console.log("Use: " + process.argv[1] + " {file_name}");
}


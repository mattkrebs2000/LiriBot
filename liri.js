//add code to read and set any environment variables with the dotenv package:

require("dotenv").config();


//Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");
var spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

// Variables to access command line entries

var command = process.argv[2];
var specificRequest = process.argv.slice(3).join(" ");

// console.log(command);
// console.log(specificRequest);

function runLiri(command, specificRequest) {
    switch (command) {
        case "concert-this":
            getBandsInTown(specificRequest);
            break;

        case "spotify-this":
            getSpotify(specificRequest);
            break;


        case "movie-this":
            getOMDB(specificRequest);
            break;


        case "do-what-it-says":
            getRandom();
            break;

            default:
            console.log("please enter one of the following commands: 'spotify-this', 'concert-this','movie-this','do-what-it-says'");

    }
};

function getBandsInTown(band){
var band=specificRequest;
    var bandqueryURL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp"
    axios.get(bandqueryURL).then(
        function(response){
            console.log("++++++++++++++++++++++++++++++++++");
            console.log("Name of the Venue: "+response.data[0].venue.name +"\r\n");
            console.log("Venue Location: " + response.data[0].venue.city + response.data[0].venue.region + "\r\n");
            console.log("Date of the Event: " + moment(response.data[0].datetime).format(MM-DD-YYYY) + "\r\n");
            var logConcert = "------ Begin Concert Log Entry -------" + "\n Name of the Musician: " + band + "\r\n";

            fs.appendFile("log.txt", logConcert, function (err) {
                if (err) throw err; 




            });
        
          


       
       
       
        }
       

    )
    
};
runLiri();





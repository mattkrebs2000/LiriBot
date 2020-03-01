//add code to read and set any environment variables with the dotenv package:

require("dotenv").config();


//Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
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

        // case "spotify-this":
        //     getSpotify(process.argv.slice(3).join(" "));
        //     break;    

        case "spotify-this":
            console.log("specificRequest" + specificRequest);
            getSpotify(specificRequest);
            break;


        case "movie-this":
            getOMDB(specificRequest);
            break;
        case "do-what-it-says":
            getRandom();
            break;
        default:
            console.log("Please enter one of the following commands: 'spotify-this', 'concert-this','movie-this','do-what-it-says'");

    }
};

function getBandsInTown(band){
var band=specificRequest;
    var bandqueryURL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp"
    axios.get(bandqueryURL).then(
        function(response){
            console.log("++++++++++++++++++++++++++++++++++");
            console.log("Name of the Musician: " + band + "\r\n");
            console.log("Name of the Venue: " + response.data[0].venue.name + "\r\n");
            console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + "\r\n");

            console.log("Date of the Event: " + moment(response.data[0].datetime).format('MM-DD-YYYY')+ "\r\n");


            var logConcert = "\r\n" + "------ Begin Concert Log Entry -------" + "\nName of the Musician: " + band + "\r\n" + "\nName of the Venue: " + response.data[0].venue.name + "\r\n" + "\nVenue Location: " + response.data[0].venue.city + ", "+response.data[0].venue.region + "\r\n" + "\nDate of the Event: " + moment(response.data[0].datetime).format('MM-DD-YYYY') + "\r\n" +
            "======End Concert Log Entry======\n";

            fs.appendFile("log.txt", logConcert, function (err) {
                if (err) throw err; 

            });
        }
    )
};


function getOMDB(movie) {

    var movie = specificRequest;
    
  
    if (!movie) {

        // Why won't this Mr. Nobody process? 

        movie = "Mr. Nobody";
        console.log(movie);
    };

    var moviequeryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.request(moviequeryURL).then(

    function(response) {

        console.log("Title of the Movie: "+ response.data.Title + "\r\n");
        console.log("Year the movie came out: " + response.data.Year + "\r\n");
        console.log("IMDB rating of the Movie: " + response.data.imdbRating + "\r\n");
        console.log("Rotten Tomatoes rating of the movie: " + response.data.Ratings[1].Value + "\r\n");
        console.log("Country where the movie was produced: " + response.data.Country + "\r\n");
        console.log("Language of the Movie: " + response.data.Language + "\r\n");
        console.log("Plot of the Movie: " + response.data.Plot + "\r\n");
        console.log("Actors in the Movie: " + response.data.Actors + "\r\n");


            var logMovie = "\r\n" +"------ Begin Movie Log Entry -------" + "\r\n" + "\nName of the Movie: " + movie + "\r\n" + "\nYear the movie came out: " + response.data.Year + "\r\n" + "\nIMDB rating of the Movie: " + response.data.imdbRating + "\r\n" + "\nRotten Tomatoes rating of the movie: " + response.data.Ratings[1].Value + "\r\n" + "\nActors in the Movie: " + response.data.Actors + "\r\n" + "\nPlot of the Movie: " + response.data.Plot + "\r\n" +
            "\n======End Movie Log Entry======\n";

            fs.appendFile("log.txt", logMovie, function (err) {
                if (err) throw err;

            });
    });
    };

function getSpotify(song) {

    var spotify = new Spotify(keys.spotify);
    console.log("Spotify key: " + spotify);

    // var song = specificRequest;

    if (!song) {

        song = "Ace of Base";
        console.log(song);
    };

spotify.search({type: 'track', query: song},function (err,data) {

    if (err){

        return console.log('Error occurred: ' + err);

    }
    console.log("=========================");
    console.log("Artists Name: " + data.tracks.items[0].album.artists[0].name + "\r\n");
    console.log("Song Name: " + data.tracks.items[0].name + "\r\n");
    console.log("Song Previw Link: " + data.tracks.items[0].href + "\r\n");
    console.log("Album: " + data.tracks.items[0].album.name + "\r\n");

    var logSong = "\r\n" + "---------- Begin Spotify Log Entry ---------" + "\r\n" + "\nArtist: " + data.tracks.items[0].album.artists[0].name + "\r\n" + "\nSong Name: " + data.tracks.items[0].name + "\r\n" + "\n Preview Link: " + data.tracks.items[0].href + "\r\n" + "\nAlbum Name: " + data.tracks.items[0].album.name + "\r\n" + "\n======End Spotify Log Entry======" + "\n";

    fs.appendFile("log.txt", logSong, function (err) {
        if (err) throw err;
    });

});





};

function getRandom () {
 
    fs.readFile("random.txt","utf8", function(error,data){
        if(error) {
            return console.log(error);
        } else {
            console.log(data);
            var randomData = data.split(",");
           
            runLiri(randomData[0], randomData[1])

        }
          console.log("\r\n" + "testing: " + randomData[0] + " and " + randomData[1]);


    });



};



runLiri(command, specificRequest);





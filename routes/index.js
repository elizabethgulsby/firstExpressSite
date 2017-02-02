var express = require('express');
var router = express.Router();
// the only request is available is because we npm installed it - need this because we're fetching data from an external API
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
	 // res.render takes two parameters, the view (template) [in "Views" folder] that you want to use and what you want to pass to that view (variables, objects etc) - the index below is the index.ejs file (it was index.jade - we had to make index.ejs - changed this in app.js)
	 var student1 = "Sean";
	 var fruits = ['apple', 'banana', 'orange', 'pear'];

	res.render('index', { 
		student: student1, 
		fruitArray: fruits 
	});
	// res.send("Hello from Express!");
	// res.json({name: "Liz"});
});


//defining a new route
router.get('/canvas', function(req, res, next) {  //maybe make separate css/js files for canvasGame?
	//if we had a database, we could feed the data into this template - that's why this object is there (e.g. if a user wanted to return to play again, etc - we could store that data here - Express can update the database)
	var fakeDBData = {
		name: "Liz",
		highScore: 23
	}
	//go get a template, the one called canvasGame.ejs (in Views folder), can pass user object if desired
	res.render('canvasGame', {user: fakeDBData});  //canvasGame.ejs contains the data to be sent to the browser
});


//new route for weather
router.get('/weather', function(req, res, next) {
	var apikey = 'e312dbeb8840e51f92334498a261ca1d';
    var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&APPID="+apikey;
    request.get(weatherUrl, function(error, response, weatherData) {

    	console.log(weatherData);  //appears in terminal in JSON format
    	weatherData = JSON.parse(weatherData);
    	res.render('weather', {weatherObject: weatherData})  //render the info in weather.ejs to browser- weatherObject is defined there, and weatherData from the API call will be inserted where weatherObject (+ props) is in weather.ejs 
    });
});

module.exports = router;

//using axios as an api utility
import axios from 'axios';
import apiKey from './apiKey';
//setting API key to variables

var _APIURL = "http://api.openweathermap.org/data/2.5/";
var _APIKEY = apiKey;

//This utility will provide access to the open weather API.
// From openweather documents: 'To make the result more accurate just put the city name and country divided by comma.'
// Example
// http://api.openweathermap.org/data/2.5/weather?q=tarrytown&type=accurate&unit=celcius&appid=b714ec74bbab5650795063cb0fdf5fbe
//Unit is metric because... when I go to Norway I need to use metric! (celcius is used in global aviation also. Yes even the US)
//function to provide endpoint parameters
var getQueryStringData = function(city){
	return {
		q : city,
		type: 'accurate',
    units: 'metric',
		APPID: _APIKEY,
	}
};

// prepRouteParams is invoked in makeWeatherURL function
// Object.keys returns an array
// .map goes through Object.keys array and applies a callback to each key
// return a string of the key and value
// .join will join each string returned from every iteration of .map
var prepRouteParams = function(queryStringData){
	return Object.keys(queryStringData)
		.map(function(key){
			return key + '=' + encodeURIComponent(queryStringData[key]);
		}).join('&')
};

//concats different string components to create a URL
var makeWeatherURL = function(type, queryStringData){
	return _APIURL + type + '?' + prepRouteParams(queryStringData);
};

//Run API get request with axios
var getCurrentWeather = function(city){
	var queriedString = getQueryStringData(city); //JS object from above
	var url = makeWeatherURL("weather", queriedString);
	//axios performs get request to endpoint
	return axios.get(url)
		//Promise to provide success or fail results
		//success provides data as a JSON object
		.then(function(data){
				//Send data back to where it was called
				return data
			})
		//.catch provides error description
		.catch(function(error){
			console.warn("Error with weatherApi" + error)
			return error
		})
};

//export json data as getCurrentWeather
module.exports = {
	getCurrentWeather: getCurrentWeather
};

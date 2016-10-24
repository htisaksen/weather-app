//using axios as an api utility
import axios from 'axios';

//setting API key to variables
var _APIURL = "http://api.openweathermap.org/data/2.5/"
var _APIKEY = "1edb7fd1f51cdac25a36b46980500f87"

//This utility will provide access to the open weather API.
// From openweather documents: 'To make the result more accurate just put the city name and country divided by comma.'
// Example
// http://api.openweathermap.org/data/2.5/weather?q=tarrytown&type=accurate&unit=celcius&appid=b714ec74bbab5650795063cb0fdf5fbe
//Unit is metric because if I go to Norway I need to use metric! (celcius is used in global aviation also. Yes even the US)
//function to provide endpoint parameters
function getQueryStringData(city){
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
function prepRouteParams(queryStringData){
	return Object.keys(queryStringData)
		.map(function(key){
			return key + '=' + encodeURIComponent(queryStringData[key]);
		}).join('&')
};

//concats different string components to create a URL
function makeWeatherURL(type, queryStringData){
	return _APIURL + type + '?' + prepRouteParams(queryStringData);
};

//Run API get request with axios
function getCurrentWeather(city){
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
		//.catch provides rejection description
		.catch(function(err){
			console.warn("Error with weatherApi" + err)
		})
};

//export json data as getCurrentWeather
module.exports = {
	getCurrentWeather: getCurrentWeather
};

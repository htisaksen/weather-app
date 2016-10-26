import React from 'react';
import Loading from './Loading';
import todayDate from '../utilities/date';

var PropTypes = React.PropTypes;

const styles = {
  windyContainer: {
  height: '500px',
  marginTop: '7.5em',
  borderRadius: '2px',
  },
  card: {
    height:'500px',
    marginTop: '7.5em',
  },
	heading: {
		textDecoration: "underline",
		textAlign: "center",
    color: '#cfd8dc',
    paddingRight: '10%',
    paddingTop: '5%',
	},
	date:{
		textAlign: "left",
    paddingLeft: '5%',
    color: "#cfd8dc",
	},
  ulContent:{
    marginTop: '10%',
    paddingLeft: '5%',
  },
	paddingList: {
    color: "#b3e5fc light-blue lighten-4",
		padding: ".2em",
    textAlign: "left",
    fontSize: '1.0em',
    display: 'flex-inline-block'
	},
  coords: {
    textAlign: "center",
    color: '#cfd8dc',
    paddingTop: '5%',
  }
};

// imported date function from date utility
function TodayDate(props){
  return <h5 style={styles.date}>Date: {todayDate()}</h5>
}

//using windyTv's iframe to load interactive map
function WindyTv(props){
  var source = "https://embed.windytv.com/?"+String(props.data.coord.lat)+","+String(props.data.coord.lon)+",6,temp,menu,message,metric.wind.m/s"
  return(
  <iframe
    src={source}
    className = "col s8"
    width="800"
    height="500"
    frameBorder="0"
    style={styles.windyContainer}>
  </iframe>
  )
}

function WeatherDetailCard(props){
  return(
        <div className="col s4">
          <div style={styles.card} className="card blue-grey darken-4">
          <div className="card-content white-text">
            <span className="card-title">
              <h5 style ={styles.heading}>
                {props.data.name}, {props.data.sys.country}
              </h5>
              <h6 style ={styles.coords}>
                Latitude: {props.data.coord.lat}, Longitude: {props.data.coord.lon}
              </h6>
            </span>
          </div>
            <TodayDate/>
              <ul
                style={styles.ulContent}
                className="white-text">
                <li style={styles.paddingList}>Temperature:  {props.data.main.temp}°C</li>
                <li style={styles.paddingList}>Cloud Coverage:  {props.data.clouds.all}%</li>
                <li style={styles.paddingList}>Humidity:  {props.data.main.humidity}%</li>
                <li style={styles.paddingList}>Precipitation:  {props.data.weather[0].description}</li>
                <li style={styles.paddingList}>Wind Speed:  {props.data.wind.speed}m/s</li>
                <li style={styles.paddingList}>Wind Heading:  {Math.round(props.data.wind.deg)}°</li>
              </ul>
          </div>
        </div>
  )
}

// displays weather information from API
function WeatherInterface(props){
  return(
      <div className = "row">
        <WeatherDetailCard
          data={props.data}/>
        <WindyTv
          data={props.data}/>
      </div>
  )
}

function CityWeather(props){
  // response property is created during an error in axios get request
  if(props.weatherData.response){
    return(
    <div style={styles.container}>
      <h4 style={styles.container}>Weather could not be retrieved. Please go back.</h4>
    </div>
    )
  } else {
  return  props.isFetching === true
    // Ternary operator to check isLoading bool in cityContainer logic
    ? <Loading />
    : <div style={styles.container}>
        <WeatherInterface
          data={props.weatherData.data}/>
    </div>
  }
}

CityWeather.PropTypes={
  city: PropTypes.string.isRequired,
  weatherData: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
}

module.exports = CityWeather;

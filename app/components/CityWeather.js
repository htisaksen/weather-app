import React from 'react';
import Loading from './Loading';
import todayDate from '../utilities/date';

var PropTypes = React.PropTypes;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    color: 'black',
    backgroundColor: 'white'
  },
	heading: {
		textDecoration: "underline",
		textAlign: "center",
	},
	date:{
		textAlign: "center",
	},
  ulContent:{
    textAlign: "center"
  },
	paddingList: {
		padding: ".5em",
    textAlign: "left",
    fontSize: '1.5em',
    display: 'flex-inline-block'
	}
}

function TodayDate(props){
  return <h4 style={styles.date}>Date: {todayDate()}</h4>
};

function WeatherInterface(props){
  return(
    <div className="Row">
      <div className="col s12">
        <TodayDate
          />
        <ul
          style={styles.ulContent}
          className="col s12 m4">
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
};



function CityWeather(props){
  // console.log(props)
  // console.log(props.isError)
  // console.log('propserror ' +props.errorStatement)
  if(props.isError){
    return
    <div style={styles.container}>
      <h4 style={styles.heading}>Weather could not be retrieved. Please go back.</h4>
    </div>
  } else {
  return  props.isFetching === true
    // Ternary operator to check isLoading bool in cityContainer logic
    ? <Loading />
    : <div style={styles.container}>
        <h4 style ={styles.heading}>
          {props.weatherData.data.name}, {props.weatherData.data.sys.country}
        </h4>
        <h5>
          {props.weatherData.data.coord.lat}, {props.weatherData.data.coord.lon}
        </h5>
        <WeatherInterface
          data={props.weatherData.data}/>
    </div>
  }
};
CityWeather.PropTypes={
  city: PropTypes.string.isRequired,
  weatherData: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
}

module.exports = CityWeather;

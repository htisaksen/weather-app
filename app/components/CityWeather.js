import React from 'react';
import Loading from './Loading';
import todayDate from '../utilities/date';
var PropTypes = React.PropTypes;
var styles = {
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
	paddingList: {
		padding: ".5em",
    textAlign: "left",
	}
}

function TodayDate(props){
  return <h4 style={styles.date}>Date: {todayDate()}</h4>
};
//
function WeatherInterface(props){
  console.log(props)
  return(
    <div className="Row">
      <div className="col s12">
        <TodayDate
          />
        <ul className="col s12 m4">
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
  return  props.isFetching === true
    ? <Loading />
    : <div style={styles.container}>
        <h4 style ={styles.heading}>
          {props.weatherData.data.name}
        </h4>
        <WeatherInterface
          data={props.weatherData.data}/>
    </div>
};

CityWeather.PropTypes={
  city: PropTypes.string.isRequired,
  weatherData: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
}

module.exports = CityWeather;

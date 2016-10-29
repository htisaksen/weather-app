import React from 'react';
import CityWeather from '../components/CityWeather';
import weatherApi from '../utilities/weatherApi';


var CityWeatherContainer = React.createClass({
  contextTypes:{
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return {
      isFetching: true,
      weatherData: {},
    }
  },
  // passes city into getCurrentWeather function using react life cycle function
  // function invoked after component is mounted
  componentDidMount: function(){
    this.getWeather(this.props.params.city)
  },
  // passes user input into weatherApi and retrieves the weather json object
  // need to add a .catch for invalid city name
  getWeather : function(city){
    weatherApi.getCurrentWeather(city)
      .then(function(data){
        this.setState({
          isFetching: false,
          weatherData: data
        })
      }.bind(this))
  },

  render: function(){
    return(
      <div>
        <CityWeather
          city={this.props.params.city}
          weatherData={this.state.weatherData}
          isFetching = {this.state.isFetching}
          errorStatement={this.state.errorStatement}/>
      </div>
    )
  }
});

module.exports = CityWeatherContainer;

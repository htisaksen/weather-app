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
      isError: false,
    }
  },
  // passes city into getCurrentWeather function using react life cycle function
  componentWillMount: function(){
    this.getWeather(this.props.params.city)
  },
  // componentWillReceiveProps: function(){
  //   this.getWeather(this.props.params.city)
  // },
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
  // .catch(function(error){
  //   console.log(error)
  //   }
  //   this.setState({
  //     isError: true,
  //     errorStatement: String(error),
  //   }.bind(this))
// )

  render: function(){
    console.log()
    return(
      <div>
        <CityWeather
          city={this.props.params.city}
          weatherData={this.state.weatherData}
          isFetching = {this.state.isFetching}
          isError = {this.state.isError}
          errorStatement={this.state.errorStatement}/>
      </div>
    )
  }
});

module.exports = CityWeatherContainer;

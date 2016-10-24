import React from 'react';
import CityInput from '../components/CityInput';
import {Node, CacheList} from '../utilities/leastUsedCache';
var cacheList = new CacheList({"maxCaches":15});

// Rendered in Home component
// Used to update state and store user inputs
const CityInputContainer = React.createClass({
  contextTypes:{
    router: React.PropTypes.object.isRequired
  },
  // set city to empty string and a search switch to true
  getInitialState: function(){
    return {
      search: true,
      city: ''
    }
  },
  // manages case when user submits empty string
  invalidCityInput: function(event){
    if(this.state.city === ''){
      this.setState({
        search: true,
        city: ''
      })
    } else {
      // Inputs submitted city into least used cache
      cacheList.set(this.state.city);
      console.log(cacheList)
      // pushes submitted city into the route
      this.context.router.push({
        pathname: '/weather/' + this.state.city
      })
    }
  },
  // updates this.state.city as user inputs
  updateCity: function(event){
    this.setState({
      city: event.target.value
    })
  },
  render: function(){
    return(
      <CityInput
        search = {this.state.search}
        onCityInput = {this.invalidCityInput}
        onUpdateCity = {this.updateCity}
        city = {this.state.city} />
    )
  }
});

module.exports = CityInputContainer;

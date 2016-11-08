import React from 'react';
import CityInput from '../components/CityInput';
import { Node, CacheList } from '../utilities/leastUsedCache';

//set maximum cache storages with CacheList({"maxCaches":<set max caches>});
let cacheList = new CacheList({"maxCaches":15});

// Rendered in Home component
// Used to update state and store user inputs
const CityInputContainer = React.createClass({
  contextTypes:{
    router: React.PropTypes.object.isRequired
  },

  // set city to empty string and a search switch as true
  getInitialState: function(){
    return {
      search: true,
      city: '',
      data: []
    }
  },

  // user input logic
  onCityInput: function(event){
    // if event is enterkey or click
    if (event.keyCode === 13 || event.type === 'click'){
      event.preventDefault()
      //  manages empty input
      if(this.state.city === ''){
        this.setState({
          search: false,
          city: ''
        })
      } else {
        // Inputs submitted city into least used cache
        cacheList.set(this.state.city);

        // pushes submitted city into the route
        this.context.router.push({
          pathname: '/weather/' + this.state.city
        })
      }
    }
  },

  // updates this.state.city as user inputs
  updateCity: function(){
    this.setState({
      city: $('input').val()
    })
  },

  render: function(){
    return(
      <CityInput
        search = {this.state.search}
        onCityInput = {this.onCityInput}
        onUpdateCity = {this.updateCity}
        city = {this.state.city}
        data = {this.state.data}  />
    )
  },
  componentDidMount: function() {

    var data = cacheList.autoFill();
    this.setState({
      data: data
    })

  },
});

module.exports = CityInputContainer;

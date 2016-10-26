import React from 'react';
import CityInput from '../components/CityInput';
import {Node, CacheList} from '../utilities/leastUsedCache';

//set maximum cache storages with CacheList({"maxCaches":<set max caches>});
var cacheList = new CacheList({"maxCaches":15});

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
        city = {this.state.city}/>
    )
  }
});
//  Jquery for autocomplete
$( document ).ready(function() {

  $('body').on('click', '#autocomplete-input', function(event){
    var data = cacheList.autoFill();
    if($('input.autocomplete').next() !== $('ul.ulReplace autocomplete-content dropdown-content')){
      $('input.autocomplete').next().html("<ul class='ulReplace autocomplete-content dropdown-content'></ul>")
    }
    $('input.autocomplete').autocomplete({
      data: data
    });
    if($('ul').next().next()[0] == $('button')[0]){
      $('button').prev().remove()
    }
  });
});
//&& $('ul').next()[0] === $('button')[0]

module.exports = CityInputContainer;

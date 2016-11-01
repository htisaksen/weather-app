import React from 'react';
import GetWeather from '../utilities/weatherApi';

let PropTypes = React.PropTypes;

const styles = {
  buttons: {
    backgroundColor:"#1bacbd",
    width:'100%'
  }
};

function Button(props){
  return(
    <button
      className = "waves-effect waves-light btn"
      type = "submit"
      name = "action"
      onClick = {props.onCityInput}
      onMouseOver = {props.onUpdateCity}
      style = {styles.buttons}>
      {props.children}
      </button>
  )
}

function Input(props){
  return(
    <input
    className = "autocomplete"
    type = "text"
    id = "autocomplete-input"
    onChange = {props.onUpdateCity}
    placeholder = "Enter a city"
    value = {props.city}
    onKeyDown = {props.onUpdateCity}
    onKeyUp = {props.onCityInput} />
  )
}

// Search will check for search's boolean value. If there is an
// improper entry, it will ask for another input
function Search(props){
  if(props.search === false){
    return<h6>Please re-enter enter a city below</h6>
  } else{
    return <div></div>
  }
}

// onCityInput(invalid input check) run twice for button click/return key trigger
function CityInput(props){
  return (
    <div>
      <Search search = {props.search} />
      <Input
        onUpdateCity = {props.onUpdateCity}
        onCityInput = {props.onCityInput}
        city = {props.city}/>
      <Button
        onCityInput = {props.onCityInput}
        onUpdateCity = {props.onUpdateCity}>
        Get Current Weather
      </Button>
    </div>
  )
}

CityInput.PropTypes = {
  search: PropTypes.bool.isRequired,
  onCityInput: PropTypes.func.isRequired,
  onUpdateCity: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired
}

module.exports = CityInput;

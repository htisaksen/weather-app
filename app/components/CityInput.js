import React from 'react';
import GetWeather from '../utilities/weatherApi';

var PropTypes = React.PropTypes;

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
      type="submit"
      name="action"
      onClick={props.onCityInput}
      style={styles.buttons}>
      {props.children}
      </button>
  )
}

const Input = React.createClass({
  add: function(event){
    // listens for return key(keyCode 13)
    if (event.keyCode === 13){
      return this.props.onCityInput()
    }
  },
  render: function(){
    return (
      <input
      className="autocomplete"
      type="text"
      id="autocomplete-input"
      onChange = {this.props.onUpdateCity}
      placeholder = "Enter a city or zip below"
      value = {this.props.city}
      onKeyDown = {this.add} />
    )
  },
});

// Search will check for search's boolean value. If there is an
// improper entry, it will ask for another input
function Search(props){
  if(props.search === false){
    return<h6> Please re-enter enter a city or zip below</h6>
  } else{
    return <div></div>
  }
}

// onCityInput(invalid input check) run twice for button click/return key trigger
function CityInput(props){
  return (
    <div>
      <Search search={props.search} />
      <Input
        onUpdateCity = {props.onUpdateCity}
        onCityInput = {props.onCityInput}
        city = {props.city}/>
        <ul className='ulReplace autocomplete-content dropdown-content'></ul>
      <Button
        onCityInput = {props.onCityInput}>
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

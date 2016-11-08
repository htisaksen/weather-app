import React from 'react';
import GetWeather from '../utilities/weatherApi';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';
// called to allow userinputs to be detected
injectTapEventPlugin();

let PropTypes = React.PropTypes;

const dataSourceConfig = {
  text: 'textKey',
  value: 'valueKey',
};

const styles = {
  buttons: {
    backgroundColor:"#1bacbd",
    width:'100%'
  },
  inputMenu: {
    maxHeight: '200px',
    overflow:"scroll"
  },
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
      <form>
        <Search search = {props.search} />
        <AutoComplete
          floatingLabelText="Please enter a city."
          filter={AutoComplete.caseInsensitiveFilter}
          openOnFocus={true}
          fullWidth = {true}
          dataSource={props.data}
          dataSourceConfig={dataSourceConfig}
          onUpdateInput = {props.onUpdateCity}
          onNewRequest = {props.onCityInput}
          onChange = {props.onUpdateCity}
          onKeyDown = {props.onUpdateCity}
          onKeyUp = {props.onCityInput}
          menuStyle = {styles.inputMenu} />
        <Button
          onCityInput = {props.onCityInput}
          onUpdateCity = {props.onUpdateCity}>
          Get Current Weather
        </Button>
      </form>
    </div>
  )
}

CityInput.PropTypes = {
  search: PropTypes.bool.isRequired,
  onCityInput: PropTypes.func.isRequired,
  onUpdateCity: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
}

module.exports = CityInput;

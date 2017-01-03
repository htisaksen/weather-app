
**Daily Weather React/Express application**

**Materialize design**

**Using babel for transpiling and webpack to compile**


**Users will need to get their own API key from www.openweathermap.org and pass it to the _APIKEY variable in weatherApi.js**

**Using www.Windytv.com to show displayed weather data**

- Using containers/Components style
 - Containers hold business logic
 - Components hold JSX render elements
- Config
  - Config holds router.
    - Router allows user to navigate through the DOM.
- Utilities
  - Holds general utilities for app functionality
   - apiKey(gitignored)
      - const _APIKEY = '<APIKEY>'' <br />
        module.exports = _APIKEY
    - Date
      - Provides date date function
    - WeatherApi
      - Uses axios to get data from openweathermap.org
    - LeastUsedCache
      - Cache to store x amount of inputs. Resets on page reload

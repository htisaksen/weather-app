import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Main from '../components/Main';
import HomeContainer from '../containers/HomeContainer';
import CityWeatherContainer from '../containers/CityWeatherContainer';

const router = (
	<Router history={browserHistory}>
		<Route path='/' component={Main}>
			<IndexRoute component={HomeContainer} />
			<Route path='/weather/:city' component={CityWeatherContainer} />
		</Route>
	</Router>
)

module.exports = router;

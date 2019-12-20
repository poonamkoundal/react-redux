import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../container/App';
import Product from '../../container/Product';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
const Routers=()=>(
	<Router>
	<div>
	<Route exact path="/" component={Product} />

	</div>
</Router>)

export default Routers;

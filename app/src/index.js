import React from 'react';
import {render} from 'react-dom';
import Product from './container/Product';
import './index.css';
/*********** Redux ************/
import todoApp from './redux'
import { createStore } from 'redux';
import { Provider } from 'react-redux'

let store = createStore(todoApp);

render(
  <Provider store={store}>
    <Product />
  </Provider>,
  document.getElementById('root')
)

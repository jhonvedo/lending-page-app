import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
//import store from './redux/store';


import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './redux/sagas/credit';
import {credit} from './redux/redicers/credit';

const sagaMiddleware = createSagaMiddleware();

/*eslint-disable */
const composeSetup =
    process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;
/*eslint-enable */

const store = createStore(
  credit,
    composeSetup(applyMiddleware(sagaMiddleware)) // allows redux devtools to watch sagas
);

// Begin our Index Saga
sagaMiddleware.run(sagas);



ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />

    </React.StrictMode>
  </Provider>

  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

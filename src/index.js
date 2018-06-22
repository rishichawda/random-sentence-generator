import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';
import store from './reducers';
import { Provider } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>
    , document.getElementById('root'));


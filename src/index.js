import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { SnackbarProvider } from 'notistack';


const history = createBrowserHistory();

ReactDOM.render(
    <SnackbarProvider maxSnack="2">
        <Router history={history}>
            <App />
        </Router>
    </SnackbarProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

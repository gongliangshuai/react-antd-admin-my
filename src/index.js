import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRedirect, useRouterHistory} from 'react-router';
import {createHistory} from 'history'

import configureStore from './store/configureStore';

import App from './views/App';
import Home from './views/Home';
import Login from './views/Login';

import Dome from './views/Demo';
import Dome1 from './views/Demo1';

import {getCookie} from './utils';

const history = useRouterHistory(createHistory)({ basename: '' })
const store = configureStore();

const validate = function (next, replace, callback) {
    const isLoggedIn = !!getCookie('uid')
    if (!isLoggedIn && next.location.pathname != '/login') {
        //replace('/login')
    }
    callback()
}

ReactDOM.render(
   <Provider store={store}>
        <Router history={history}>
                <Route path="/" onEnter={validate}>
                    <IndexRedirect to="home" />
                    <Route component={App}>
                        <Route path="home" component={Home} />
                        <Route path="demo" component={Dome} />
                        <Route path="demo1" component={Dome1} />
                    </Route>
                    <Route path="login" component={Login}/>
                </Route>
            </Router>
    </Provider>,
    document.getElementById('root')
);

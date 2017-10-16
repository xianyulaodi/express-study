//import 'fetch-ie8';
import 'es5-shim';
import 'es5-shim/es5-sham';
import 'es6-shim';

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers,applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { HashRouter as Router,Route,Link,Switch} from 'react-router-dom'
import {syncHistoryWithStore} from 'react-router-redux'
import  * as reducers from './reducers/index' // Or wherever you keep your reducers

import AddTopic from 'components/addTopic'
import Main from 'containers/Main'
import LoginRegister from 'containers/LoginRegister'
import AuthorCenter from 'containers/AuthorCenter'
import Detail from 'components/Detail'
import UserSetting from 'components/UserSetting'
import NoMatch from 'components/Page404'

//import DevTools from './containers/DevTools'

import myCreateStores from './store'
const browserHistory = createHistory()
import { CSSTransitionGroup } from 'react-transition-group'
import Header from './components/Header'
import './static/scss/common.scss';
import './static/scss/index.scss'

const stores = myCreateStores(browserHistory)
const history = syncHistoryWithStore(browserHistory, stores)

ReactDOM.render(
  <Provider store={stores}>
    <Router history={history}>
      <div>
        <Header></Header>
        <div className="container-main">
              <CSSTransitionGroup transitionName='fade' transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                <Switch>
                  <Route exact path="/" location={history.location} key={history.location.key} component={Main}/>
                  <Route path="/detail/:id" location={history.location} key={history.location.key} component={Detail}/>
                  <Route path="/sign_in" location={history.location} key={history.location.key} component={LoginRegister} />
                  <Route path="/sign_up" location={history.location} key={history.location.key} component={LoginRegister} />
                  <Route path="/add_topic" location={history.location} key={history.location.key} component={AddTopic}/>
                  <Route path="/setting" location={history.location} key={history.location.key} component={UserSetting}/>
                  <Route path="/author_center/:authorId" location={history.location} key={history.location.key} component={AuthorCenter}/>
                  <Route location={history.location} key={history.location.key} component={NoMatch}/>
                </Switch>
              </CSSTransitionGroup>
        </div>
       {/* <DevTools />*/}
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
)

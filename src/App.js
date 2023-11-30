import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import SelectedMovie from './components/SelectedMovie'
import SearchRoute from './components/SearchRoute'
import NotFound from './components/NotFound'
import UserAccount from './components/UserAccount'
import ProtectedRoute from './components/ProtectedRoute'
import MovieContext from './MovieContext/MovieContext'
import './App.css'

class App extends Component {
  state = {activeRoute: 'Home'}

  changeRoute = selectedRoute => {
    this.setState({activeRoute: selectedRoute})
  }

  render() {
    const {activeRoute} = this.state

    return (
      <MovieContext.Provider
        value={{activeRoute, changeRoute: this.changeRoute}}
      >
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute exact path="/movies/:id" component={SelectedMovie} />
          <ProtectedRoute exact path="/search" component={SearchRoute} />
          <ProtectedRoute exact path="/account" component={UserAccount} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </MovieContext.Provider>
    )
  }
}

export default App

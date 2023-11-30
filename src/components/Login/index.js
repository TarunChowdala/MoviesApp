import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    console.log(fetchedData)
    if (response.ok === true) {
      const {history} = this.props
      Cookies.set('jwt_token', fetchedData.jwt_token, {
        expires: 30,
      })
      history.push('/')
    } else {
      this.setState({errorMsg: fetchedData.error_msg, showErrorMsg: true})
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="" />
    }

    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dvtotdiqa/image/upload/v1699532291/gnufpuwgxo5w9ervsiax.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="inner-container">
          <div className="form-container">
            <form className="form" onSubmit={this.onSubmitForm}>
              <h1 className="form-heading">Login</h1>
              <label className="label" htmlFor="input-1">
                USERNAME
              </label>
              <br />
              <input
                value={username}
                onChange={this.onChangeUsername}
                type="text"
                className="input-element"
                id="input-1"
                placeholder="username"
                style={{marginBottom: '15px'}}
              />
              <br />
              <label className="label" htmlFor="input-2">
                PASSWORD
              </label>
              <br />
              <input
                value={password}
                onChange={this.onChangePassword}
                type="password"
                className="input-element"
                id="input-2"
                placeholder="password"
              />
              {showErrorMsg && <p className="error-msg">{errorMsg}</p>}

              <button type="submit" className="login-button">
                Login
              </button>
              <button type="submit" className="login-button-mobile">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login

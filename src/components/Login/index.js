import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showError: true})
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    console.log(token)
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-card-container">
          <h1 className="login-heading">UNI Resto Cafe</h1>
          <h1 className="welcome-note">Welcome Back</h1>
          <p className="welcome-para">
            Glad to see you again👋 <br />
            Login to your account below
          </p>
          <form onSubmit={this.onLogin}>
            <label className="login-label" htmlFor="username">
              Username
            </label>
            <input
              className="login-input"
              id="username"
              value={username}
              onChange={this.onUsernameChange}
              type="text"
              placeholder="Enter your username"
            />
            <label className="login-label" htmlFor="password">
              Password
            </label>
            <input
              className="login-input"
              id="password"
              value={password}
              onChange={this.onPasswordChange}
              type="password"
              placeholder="Enter your password"
            />
            <button className="login-button" type="submit">
              Login
            </button>
            {showError && <p className="error-text">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  submitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userLoginData = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userLoginData),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-container">
          <img
            className="login-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form
            className="login-form-container"
            onSubmit={this.submitLoginForm}
          >
            <div className="login-input-container">
              <label className="login-label" htmlFor="username">
                USERNAME
              </label>
              <input
                className="login-input"
                value={username}
                onChange={this.changeUsername}
                type="text"
                id="username"
                placeholder="Username"
              />
            </div>
            <div className="login-input-container">
              <label className="login-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="login-input"
                value={password}
                onChange={this.changePassword}
                type="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            {errorMsg.length > 0 && (
              <p className="login-error-msg">*{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default Login

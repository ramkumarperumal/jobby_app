import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutProfile = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="header-nav-container">
      <Link className="link" to="/">
        <img
          className="header-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="header-sm-icon-container">
        <Link className="link" to="/">
          <li className="header-sm-icon-item">
            <AiFillHome className="header-sm-icon" />
          </li>
        </Link>
        <Link className="link" to="/jobs">
          <li className="header-sm-icon-item">
            <BsBriefcaseFill className="header-sm-icon" />
          </li>
        </Link>

        <li
          onClick={logoutProfile}
          className="header-sm-icon-item header-sm-icon-logout"
        >
          <FiLogOut className="header-sm-icon" />
        </li>
      </ul>
      <ul className="header-md-nav-item-container">
        <Link className="link" to="/">
          <li className="header-md-nav-item">Home</li>
        </Link>
        <Link className="link" to="/jobs">
          <li className="header-md-nav-item">Jobs</li>
        </Link>
      </ul>
      <button
        onClick={logoutProfile}
        className="header-md-logout-btn"
        type="button"
      >
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)

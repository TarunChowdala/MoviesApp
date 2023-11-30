import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const UserAccount = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="user-account-container">
      <Header />
      <div className="user-details-container">
        <div className="user-details-inner-container">
          <h1 className="account-name">Account</h1>
          <hr />
          <div className="membership-box">
            <p className="membership-text">Member ship</p>
            <div className="details">
              <p className="mail">rahul@gmail.com</p>
              <p className="password">
                <span className="span">Password :</span> *******
              </p>
            </div>
          </div>
          <hr />
          <div className="membership-box">
            <p className="plan-details-text">Plan details</p>
            <div className="premium-details">
              <p className="premium">Premium</p>
              <img
                src="https://res.cloudinary.com/dvtotdiqa/image/upload/f_auto,q_auto/y2zhgbogpin7jcalktvz"
                className="hd-icon"
                alt="ULTRA HD"
              />
            </div>
          </div>
          <hr />
          <div className="button-container">
            <button
              type="button"
              className="logout-button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="social-icons-container">
        <div className="icons-box">
          <FaGoogle className="social-icons" />
          <FaTwitter className="social-icons" />
          <FaInstagram className="social-icons" />
          <FaYoutube className="social-icons" />
        </div>
        <p className="contact-us-text">Contact Us</p>
      </div>
    </div>
  )
}

export default UserAccount

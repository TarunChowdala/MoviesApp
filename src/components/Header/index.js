import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'

import {BsTextIndentRight, BsXSquareFill} from 'react-icons/bs'
import {HiOutlineSearch} from 'react-icons/hi'

import MovieContext from '../../MovieContext/MovieContext'
import './index.css'

const Header = props => (
  <MovieContext.Consumer>
    {value => {
      const {activeRoute, changeRoute} = value
      const {history} = props
      const onClickHome = () => {
        changeRoute('Home')
        history.push('/')
      }
      const onClickPopular = () => {
        changeRoute('Popular')
        history.push('/popular')
      }
      const onClickSearch = () => {
        changeRoute('Search')
        history.push('/search')
      }

      const onClickProfile = () => {
        changeRoute('Account')
        history.push('/account')
      }

      const homeClassName = activeRoute === 'Home' ? 'active-home' : 'home-text'
      const popularClassName =
        activeRoute === 'Popular' ? 'active-popular' : 'popular-text'
      const accountClassName =
        activeRoute === 'Account' ? 'active-home' : 'home-text'
      return (
        <>
          <navbar className="navbar">
            <div className="nav-container">
              <div className="nav-box-left">
                <Link to="/" className="link-item">
                  <img
                    src="https://res.cloudinary.com/dvtotdiqa/image/upload/v1699532291/gnufpuwgxo5w9ervsiax.png"
                    alt="website logo"
                    className="nav-logo"
                    onClick={onClickHome}
                  />
                </Link>
                <Link to="/" className="link-item">
                  <p className={homeClassName} onClick={onClickHome}>
                    Home
                  </p>
                </Link>
                <Link to="/popular" className="link-item">
                  <p className={popularClassName} onClick={onClickPopular}>
                    Popular
                  </p>
                </Link>
              </div>
              <div className="nav-box-right">
                <Link to="/search" className="link-item">
                  <HiOutlineSearch
                    className="search-icon"
                    onClick={onClickSearch}
                    data-testid="searchButton"
                  />
                </Link>
                <Link to="/account" className="link-item">
                  <img
                    src="https://res.cloudinary.com/dvtotdiqa/image/upload/f_auto,q_auto/emobjkxcrmyhksz0mqag"
                    alt="profile"
                    className="profile"
                    onClick={onClickProfile}
                  />
                </Link>
              </div>
            </div>
          </navbar>

          <navbar className="navbar-small">
            <div className="nav-container">
              <Link to="/" className="link-item">
                <img
                  src="https://res.cloudinary.com/dvtotdiqa/image/upload/v1699532291/gnufpuwgxo5w9ervsiax.png"
                  alt="website logo"
                  className="nav-logo"
                  onClick={onClickHome}
                />
              </Link>
              <div className="nav-box-right">
                <Link to="/search" className="link-item">
                  <HiOutlineSearch
                    className="icon"
                    data-testid="searchButton"
                  />
                </Link>

                <Popup
                  lockScroll
                  modal
                  trigger={<BsTextIndentRight className="icon" />}
                  className="popup"
                >
                  {close => (
                    <div className="popup-container">
                      <BsXSquareFill
                        className="close-icon"
                        onClick={() => close()}
                      />
                      <div>
                        <p className={homeClassName} onClick={onClickHome}>
                          Home
                        </p>

                        <p
                          className={popularClassName}
                          onClick={onClickPopular}
                        >
                          Popular
                        </p>

                        <p
                          className={accountClassName}
                          onClick={onClickProfile}
                        >
                          Account
                        </p>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          </navbar>
        </>
      )
    }}
  </MovieContext.Consumer>
)

export default withRouter(Header)

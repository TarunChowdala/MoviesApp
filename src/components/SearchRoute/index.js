import {Component} from 'react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'
import {HiOutlineSearch} from 'react-icons/hi'
import {BsTextIndentRight, BsXSquareFill} from 'react-icons/bs'

import MovieContext from '../../MovieContext/MovieContext'
import MovieItem from '../MovieItem'
import './index.css'

class SearchRoute extends Component {
  state = {searchInput: '', searchedData: [], isDataFetched: false}

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.fetchData()
  }

  onKeydownInput = event => {
    if (event.key === 'Enter') {
      this.fetchData()
    }
  }

  fetchData = async () => {
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const formattedData = fetchedData.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))

      this.setState({
        searchedData: formattedData,
        isDataFetched: true,
      })
    }
  }

  renderSearchedData = () => {
    const {searchedData, searchInput} = this.state
    if (searchedData.length === 0) {
      return (
        <div className="search-container-failure">
          <img
            src="https://res.cloudinary.com/dvtotdiqa/image/upload/f_auto,q_auto/ab9ojyypcbfpkwr1uqkt"
            alt="no movies"
            className="search-failure-img"
          />
          <p className="search-failure-para">{`Your search for ${searchInput} did not find any matches.`}</p>
        </div>
      )
    }
    return (
      <ul className="popular-movies-container">
        {searchedData.map(eachItem => (
          <MovieItem key={eachItem.id} eachItem={eachItem} />
        ))}
      </ul>
    )
  }

  render() {
    const {searchInput, isDataFetched} = this.state
    return (
      <MovieContext.Consumer>
        {value => {
          const {activeRoute, changeRoute} = value
          const {history} = this.props
          const onClickHome = () => {
            changeRoute('Home')
            history.push('/')
          }

          const onClickPopular = () => {
            changeRoute('Popular')
            history.push('/popular')
          }

          const onClickProfile = () => {
            changeRoute('Account')
            history.push('/account')
          }

          const homeClassName =
            activeRoute === 'Home' ? 'active-home' : 'home-text'
          const popularClassName =
            activeRoute === 'Popular' ? 'active-popular' : 'popular-text'
          const accountClassName =
            activeRoute === 'Account' ? 'active-home' : 'home-text'

          return (
            <div className="search-route-container">
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
                        <p
                          className={popularClassName}
                          onClick={onClickPopular}
                        >
                          Popular
                        </p>
                      </Link>
                    </div>
                    <div className="nav-box-right-search-bar">
                      <div className="search-container">
                        <input
                          value={searchInput}
                          placeholder="search"
                          type="search"
                          className="search-bar"
                          onChange={this.onChangeSearchInput}
                          onKeyDown={this.onKeydownInput}
                        />
                        <div className="search-bar-container">
                          <HiOutlineSearch
                            className="search-icon"
                            onClick={this.onClickSearch}
                            data-testid="searchButton"
                          />
                        </div>
                      </div>
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
                    <div className="nav-box-right-small">
                      <div className="search-container-small">
                        <input
                          value={searchInput}
                          placeholder="search"
                          type="search"
                          className="search-bar"
                          onChange={this.onChangeSearchInput}
                          onKeyDown={this.onKeydownInput}
                        />
                        <div className="search-bar-container">
                          <HiOutlineSearch
                            className="search-icon"
                            onClick={this.onClickSearch}
                          />
                        </div>
                      </div>
                      <Popup
                        lockScroll
                        modal
                        trigger={<BsTextIndentRight className="icon" />}
                        position="right center"
                      >
                        {close => (
                          <div className="popup-container">
                            <BsXSquareFill
                              className="close-icon"
                              onClick={() => close()}
                            />
                            <div>
                              <p
                                className={homeClassName}
                                onClick={onClickHome}
                              >
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
              <div className="search-movies-container">
                {isDataFetched && this.renderSearchedData()}
              </div>
            </div>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}

export default SearchRoute

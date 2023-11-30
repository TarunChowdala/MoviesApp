import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import Slider from 'react-slick'

import LoaderItem from '../Loader'

import Header from '../Header'
import Container from './styledComponent'
import MovieContext from '../../MovieContext/MovieContext'

import './index.css'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {
    trendingVideos: {},
    originals: {},
    originalsApiStatus: 'initial',
    trendingApiState: 'initial',
  }

  componentDidMount() {
    this.fetchTrendingVideos()
    this.fetchOriginals()
  }

  fetchOriginals = async () => {
    const url = 'https://apis.ccbp.in/movies-app/originals'
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
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({
        originals: [...formattedData],
        originalsApiStatus: 'success',
      })
    } else {
      this.setState({originalsApiStatus: 'failed'})
    }
  }

  renderFailureView = () => (
    <div className="failed-container">
      <img
        src="https://res.cloudinary.com/dvtotdiqa/image/upload/v1700282485/wosltez7omruftsc9edh.png"
        alt="failure view"
        className="warning-icon"
      />
      <p className="error-para">Something went wrong. Please try again</p>
      <button type="button" className="retry-button">
        Try Again
      </button>
    </div>
  )

  fetchTrendingVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
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
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({
        trendingVideos: [...formattedData],
        trendingApiState: 'success',
      })
    } else {
      this.setState({trendingApiState: 'failed'})
    }
  }

  renderTrendingVideos = () => {
    const {trendingVideos} = this.state
    return (
      <MovieContext.Consumer>
        {value => {
          const {changeRoute} = value
          const onClickMovieTrending = () => {
            changeRoute('')
          }
          return (
            <div className="slick-container">
              <Slider {...settings}>
                {trendingVideos.map(eachItem => {
                  const {id, backdropPath, title} = eachItem
                  return (
                    <div className="slick-item" key={id}>
                      <Link to={`/movies/${id}`} className="link-item">
                        <img
                          className="logo-image"
                          src={backdropPath}
                          alt={title}
                          onClick={onClickMovieTrending}
                        />
                      </Link>
                    </div>
                  )
                })}
              </Slider>
            </div>
          )
        }}
      </MovieContext.Consumer>
    )
  }

  renderOriginalsVideos = () => {
    const {originals} = this.state
    return (
      <MovieContext.Consumer>
        {value => {
          const {changeRoute} = value
          const onClickMovieOriginals = () => {
            changeRoute('')
          }
          return (
            <div className="slick-container">
              <Slider {...settings}>
                {originals.map(eachItem => {
                  const {id, backdropPath} = eachItem
                  return (
                    <div className="slick-item" key={id}>
                      <Link to={`/movies/${id}`} className="link-item">
                        <img
                          className="logo-image"
                          src={backdropPath}
                          alt={eachItem.title}
                          onClick={onClickMovieOriginals}
                        />
                      </Link>
                    </div>
                  )
                })}
              </Slider>
            </div>
          )
        }}
      </MovieContext.Consumer>
    )
  }

  checkingTrendingVideos = () => {
    const {trendingApiState} = this.state

    switch (trendingApiState) {
      case 'success':
        return this.renderTrendingVideos()
      case 'failed':
        return this.renderFailureView()
      default:
        return (
          <div className="videos-loader-container">
            <LoaderItem />
          </div>
        )
    }
  }

  checkingOriginals = () => {
    const {originalsApiStatus} = this.state
    switch (originalsApiStatus) {
      case 'success':
        return this.renderOriginalsVideos()
      case 'failed':
        return this.renderFailureView()
      default:
        return (
          <div className="videos-loader-container">
            <LoaderItem />
          </div>
        )
    }
  }

  renderTopSection = () => {
    const {originals} = this.state
    const randomNum = Math.ceil(Math.random() * originals.length) - 1

    const randomFilm = originals[randomNum]
    const {backdropPath, title, overview, posterPath, id} = randomFilm
    return (
      <MovieContext.Consumer>
        {value => {
          const {changeRoute} = value
          const onClickMovie = () => {
            changeRoute('')
          }
          return (
            <Container mobileBgm={posterPath} laptopBgm={backdropPath}>
              <Header />
              <div className="movie-description">
                <h1 className="movie-heading">{title}</h1>
                <p className="movie-para">{overview}</p>
                <Link to={`movies/${id}`} className="link-item">
                  <button
                    type="button"
                    className="play-button"
                    onClick={onClickMovie}
                  >
                    Play
                  </button>
                </Link>
              </div>
            </Container>
          )
        }}
      </MovieContext.Consumer>
    )
  }

  renderFailureViewForTopSection = () => (
    <>
      <Header />
      <div className="error-top-container">
        <img
          src="https://res.cloudinary.com/dvtotdiqa/image/upload/v1700282485/wosltez7omruftsc9edh.png"
          alt="warning"
          className="warning-icon"
        />
        <p className="error-para">Something went wrong. Please try again</p>
        <button type="button" className="retry-button">
          Try Again
        </button>
      </div>
    </>
  )

  checkingTopSection = () => {
    const {originalsApiStatus} = this.state
    switch (originalsApiStatus) {
      case 'success':
        return this.renderTopSection()
      case 'failed':
        return this.renderFailureViewForTopSection()
      default:
        return (
          <>
            <Header />
            <div className="top-section-loader">
              <LoaderItem />
            </div>
          </>
        )
    }
  }

  render() {
    return (
      <div className="home-container">
        {this.checkingTopSection()}
        <div className="main-container">
          <h1 className="slider-heading">Trending Now</h1>
          {this.checkingTrendingVideos()}
          <h1 className="slider-heading">Originals</h1>
          {this.checkingOriginals()}
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
}

export default Home

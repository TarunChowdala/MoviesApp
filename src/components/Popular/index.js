import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Header from '../Header'
import LoaderItem from '../Loader'
import MovieItem from '../MovieItem'

import './index.css'

class Popular extends Component {
  state = {popularMovies: {}, apiStatus: 'initial'}

  componentDidMount() {
    this.fetchPopularMovies()
  }

  fetchPopularMovies = async () => {
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
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
        popularMovies: [...formattedData],
        apiStatus: 'success',
      })
    } else {
      this.setState({apiStatus: 'failed'})
    }
  }

  renderPopularVideos = () => {
    const {popularMovies} = this.state
    return (
      <ul className="popular-movies-container">
        {popularMovies.map(eachItem => (
          <MovieItem key={eachItem.id} eachItem={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="popular-route-loader">
      <LoaderItem className="popular-loader" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dvtotdiqa/image/upload/v1700288301/ttejz7a5spdtqepjvwti.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button type="button" className="try-again-button">
        Try Again
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    let renderedItem
    switch (apiStatus) {
      case 'success':
        renderedItem = this.renderPopularVideos()
        break
      case 'failed':
        renderedItem = this.renderFailureView()
        break
      default:
        renderedItem = this.renderLoader()
    }
    return (
      <div className="popular-container">
        <Header className="header" />
        {renderedItem}
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

export default Popular

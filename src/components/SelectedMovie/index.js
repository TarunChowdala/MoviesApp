import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Header from '../Header'
import LoaderItem from '../Loader'
import Container from '../Home/styledComponent'
import MovieItem from '../MovieItem'
import './index.css'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'November',
  'December',
]

class SelectedMovie extends Component {
  state = {movieDetails: {}, apiStatus: 'initial'}

  componentDidMount = () => {
    this.fetchMovieDetails()
  }

  fetchMovieDetails = async () => {
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
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
      const formattedData = {
        adult: fetchedData.movie_details.adult,
        backdropPath: fetchedData.movie_details.backdrop_path,
        budget: fetchedData.movie_details.budget,
        genres: fetchedData.movie_details.genres,
        id: fetchedData.movie_details.id,
        overview: fetchedData.movie_details.overview,
        posterPath: fetchedData.movie_details.poster_path,
        releaseDate: fetchedData.movie_details.release_date,
        runtime: fetchedData.movie_details.runtime,
        similarMovies: fetchedData.movie_details.similar_movies.map(
          eachMovie => ({
            backdropPath: eachMovie.backdrop_path,
            id: eachMovie.id,
            posterPath: eachMovie.poster_path,
            title: eachMovie.title,
          }),
        ),
        spokenLanguages: fetchedData.movie_details.spoken_languages.map(
          details => ({
            englishName: details.english_name,
            id: details.id,
          }),
        ),
        title: fetchedData.movie_details.title,
        voteAvg: fetchedData.movie_details.vote_average,
        voteCount: fetchedData.movie_details.vote_count,
      }

      this.setState({movieDetails: formattedData, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failed'})
    }
  }

  renderMovieDetails = () => {
    const {movieDetails} = this.state
    const {
      backdropPath,
      title,
      overview,
      posterPath,
      releaseDate,
      runtime,
      genres,
      spokenLanguages,
      voteAvg,
      voteCount,
      budget,
      similarMovies,
    } = movieDetails

    const hours = Math.floor(parseInt(runtime) / 60)
    const minutes = runtime - hours * 60
    const duration = `${hours}h ${minutes}m`
    const date = new Date(releaseDate)
    const releasedDateInFormat = `${date.getDate()}th ${
      months[date.getMonth() - 1]
    } ${date.getFullYear()}`

    return (
      <div className="selected-movie-inner-container">
        <Container mobileBgm={posterPath} laptopBgm={backdropPath}>
          <Header />
          <div className="movie-description">
            <h1 className="movie-heading">{title}</h1>
            <div className="duration-container">
              <p className="duration">{duration}</p>
              <img
                src="https://res.cloudinary.com/dvtotdiqa/image/upload/f_auto,q_auto/g6dirtjsed9gwzsuzyyr"
                alt="movie icon"
                className="movie-icon"
              />
              <p className="release-year">{date.getFullYear()}</p>
            </div>
            <p className="movie-para">{overview}</p>

            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </Container>
        <div className="movie-description-container">
          <div className="genre-container">
            <p className="side-heading">Genres</p>
            {genres.map(eachItem => (
              <p className="side-heading-points" key={eachItem.id}>
                {eachItem.name}
              </p>
            ))}
          </div>
          <div className="audio-container">
            <p className="side-heading">Audio Available</p>
            {spokenLanguages.map(eachItem => (
              <p className="side-heading-points" key={eachItem.id}>
                {eachItem.englishName}
              </p>
            ))}
          </div>
          <div className="rating-container">
            <p className="side-heading">Rating Count</p>
            <p className="side-heading-points">{voteCount}</p>
            <p className="side-heading">Rating Average</p>
            <p className="side-heading-points">{voteAvg}</p>
          </div>
          <div className="budget-container">
            <p className="side-heading">Budget</p>
            <p className="side-heading-points">{budget}</p>
            <p className="side-heading">Release Date</p>
            <p className="side-heading-points">{releasedDateInFormat}</p>
          </div>
        </div>
        <h1 className="more-like-this-heading">More like this</h1>
        <ul className="more-movies-container">
          {similarMovies.map(eachItem => (
            <MovieItem key={eachItem.id} eachItem={eachItem} />
          ))}
        </ul>
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

  renderLoader = () => (
    <div className="popular-route-loader">
      <Header />
      <LoaderItem className="popular-loader" />
    </div>
  )

  renderedFailureView = () => (
    <>
      <Header />
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
    </>
  )

  render() {
    const {apiStatus} = this.state
    let renderedItem
    switch (apiStatus) {
      case 'success':
        renderedItem = this.renderMovieDetails()
        break
      case 'failed':
        renderedItem = this.renderedFailureView()
        break
      default:
        renderedItem = this.renderLoader()
    }
    return <div className="selected-movie-container">{renderedItem}</div>
  }
}

export default SelectedMovie

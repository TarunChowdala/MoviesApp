import {Link} from 'react-router-dom'
import MovieContext from '../../MovieContext/MovieContext'
import './index.css'

const MovieItem = props => {
  const {eachItem} = props
  const {backdropPath, title, posterPath, id} = eachItem
  return (
    <MovieContext.Consumer>
      {value => {
        const {changeRoute} = value
        const onClickMovie = () => {
          changeRoute('')
        }
        return (
          <li className="movie-item" testid="movieItem">
            <Link to={`/movies/${id}`} className="link-item">
              <img
                src={posterPath}
                alt={title}
                className="movie-img-small"
                onClick={onClickMovie}
              />
              <img
                src={backdropPath}
                alt={title}
                className="movie-img-big"
                onClick={onClickMovie}
              />
            </Link>
          </li>
        )
      }}
    </MovieContext.Consumer>
  )
}

export default MovieItem

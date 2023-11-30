import './index.css'

const NotFound = props => {
  const onClickGoHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">Lost You Way ?</h1>
      <p className="not-found-para">
        we are sorry the page you requested could not be found Please go back to
        the homepage.
      </p>
      <button
        type="button"
        className="not-found-button"
        onClick={onClickGoHome}
      >
        Go to Home
      </button>
    </div>
  )
}

export default NotFound

import Loader from 'react-loader-spinner'
import './index.css'

const LoaderItem = () => (
  <div className="loader-container" data-testid="loader">
    <Loader type="TailSpin" color="#D81F26" height={30} width={30} />
  </div>
)

export default LoaderItem

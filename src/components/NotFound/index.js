import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/pradeep-5/image/upload/v1642760283/Covid%20Dashboard/Group_7484not-found_bgnvzb.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-title">PAGE NOT FOUND</h1>
    <p className="not-found-text">
      we’re sorry, the page you requested could not be found Please go back to
      the homepage
    </p>
    <Link to="/" className="not-found-link-btn">
      <button className="not-found-home-btn" type="button">
        Home
      </button>
    </Link>
  </div>
)
export default NotFound

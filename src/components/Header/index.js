import {Link} from 'react-router-dom'

import './index.css'

export default function Header(props) {
  const {home} = props

  const homeActive = home ? 'header-list-item-active' : ''
  const aboutActive = home ? '' : 'header-list-item-active'

  return (
    <nav className="navbar">
      <div className="header-content-container">
        <Link to="/" className="header-link">
          <h1 className="header-title">
            COVID19<span className="header-title-span">INDIA</span>
          </h1>
        </Link>
        <ul className="header-list">
          <li>
            <Link to="/" className="header-link">
              <p className={`header-list-item ${homeActive}`}>Home</p>
            </Link>
          </li>
          <li>
            <Link to="/about" className="header-link">
              <p className={`header-list-item ${aboutActive}`}>About</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

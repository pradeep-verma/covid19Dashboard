import './index.css'

import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

export default function Footer() {
  return (
    <div className="footer-container">
      <h1 className="footer-title">
        COVID19<span className="footer-title-span">INDIA</span>
      </h1>
      <p className="footer-text">
        we stand with everyone fighting on the front lines
      </p>
      <div className="footer-icons-container">
        <VscGithubAlt className="footer-icon" />
        <FiInstagram className="footer-icon" />
        <FaTwitter className="footer-icon" />
      </div>
    </div>
  )
}

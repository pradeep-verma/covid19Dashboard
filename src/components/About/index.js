import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

class About extends Component {
  state = {faqsList: []}

  componentDidMount() {
    this.getFaqs()
  }

  getFaqs = async () => {
    const faqUrl = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(faqUrl)

    const data = await response.json()
    this.setState({faqsList: data.faq})
  }

  renderAbout = () => {
    const {faqsList} = this.state

    return (
      <>
        <div className="about-container">
          <h1 className="about-title">About</h1>
          <p className="about-date">Last update on march 28th 2021.</p>
          <h1 className="about-vaccine-text">
            COVID-19 vaccines be ready for distribution
          </h1>
          <ul className="about-faqsList-container">
            {faqsList.map(eachFaq => (
              <li key={eachFaq.qno} className="about-faqsList-item">
                <p className="about-faqsList-item-question">
                  {eachFaq.question}
                </p>
                <p className="about-faqsList-item-answer">{eachFaq.answer}</p>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  renderLoader = () => (
    <div className="about-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {faqsList} = this.state
    return (
      <div className="app-container">
        <Header />
        <div className="app-content-container">
          {faqsList.length === 0 ? this.renderLoader() : this.renderAbout()}
        </div>
      </div>
    )
  }
}
export default About

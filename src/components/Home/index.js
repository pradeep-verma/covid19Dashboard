import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class Home extends Component {
  state = {
    stateWiseStatsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getStats()
  }

  getStats = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(apiUrl)
    const data = await response.json()
    // console.log(data)

    const stateWiseStatsList = this.convertObjectsDataIntoListItems(data)
    this.setState({stateWiseStatsList, apiStatus: apiStatusConstants.success})
    // console.log(stateWiseStatsList)
  }

  convertObjectsDataIntoListItems = data => {
    const resultList = []
    // getting keys of an object object
    const keyNames = Object.keys(data)
    // console.log(keyNames)

    keyNames.forEach(keyName => {
      // console.log(keyName)
      if (data[keyName]) {
        const {total} = data[keyName]
        // if the state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        // console.log(confirmed, deceased, recovered, tested, population)

        const name = statesList.find(state => state.state_code === keyName)

        resultList.push({
          stateCode: keyName,
          name: name ? name.state_name : keyName,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchContainer = () => {
    const {searchInput} = this.state
    const filteredList = statesList.filter(eachState =>
      eachState.state_name.toLowerCase().startsWith(searchInput.toLowerCase()),
    )

    return (
      <div>
        <div className="home-search-container">
          <BsSearch className="home-search-icon" />
          <input
            type="search"
            placeholder="Enter the State"
            className="home-search-input"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
        </div>
        {searchInput !== '' && (
          <ul
            className="home-search-varient"
            testid="searchResultsUnorderedList"
          >
            {filteredList.map(eachItem => (
              <Link
                to={`/state/${eachItem.state_code}`}
                className="home-search-result-link"
              >
                <li className="home-search-varient-item">
                  <p className="home-search-varient-state-name">
                    {eachItem.state_name}
                  </p>
                  <div className="home-search-varient-state-code-container">
                    <p className="home-search-varient-state-code">
                      {eachItem.state_code}
                    </p>
                    <BiChevronRightSquare className="home-search-varient-item-icon" />
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderStatsContainer = () => {
    const {stateWiseStatsList} = this.state
    const totalStats = stateWiseStatsList.find(
      eachState => eachState.stateCode === 'TT',
    )
    // console.log(totalStats)

    // console.log(totalStats.confirmed)
    return (
      <ul className="home-stats-card-container">
        <li
          className="home-stats-card home-stats-card-confirmed"
          testid="countryWideConfirmedCases"
        >
          <p className="home-stats-text">Confirmed</p>
          <img
            src="https://res.cloudinary.com/pradeep-5/image/upload/v1642662043/Covid%20Dashboard/check-mark_1confirmed-image_bzu5cv.png"
            alt="country wide confirmed cases pic"
            className="home-stats-image"
          />
          <p className="home-stats-count">{totalStats.confirmed}</p>
        </li>
        <li
          className="home-stats-card home-stats-card-active"
          testid="countryWideActiveCases"
        >
          <p className="home-stats-text">Active</p>
          <img
            src="https://res.cloudinary.com/pradeep-5/image/upload/v1642662043/Covid%20Dashboard/protection_1active-image_eaymbh.png"
            alt="country wide active cases pic"
            className="home-stats-image"
          />
          <p className="home-stats-count">{totalStats.active}</p>
        </li>
        <li
          className="home-stats-card home-stats-card-recovered"
          testid="countryWideRecoveredCases"
        >
          <p className="home-stats-text">Recovered</p>
          <img
            src="https://res.cloudinary.com/pradeep-5/image/upload/v1642662043/Covid%20Dashboard/recovered_1recovered-image_gxmuvd.png"
            alt="country wide recovered cases pic"
            className="home-stats-image"
          />
          <p className="home-stats-count">{totalStats.recovered}</p>
        </li>
        <li
          className="home-stats-card home-stats-card-deceased"
          testid="countryWideDeceasedCases"
        >
          <p className="home-stats-text">Deceased</p>
          <img
            src="https://res.cloudinary.com/pradeep-5/image/upload/v1642662043/Covid%20Dashboard/breathing_1deceased-image_vj8s36.png"
            alt="country wide deceased cases pic"
            className="home-stats-image"
          />
          <p className="home-stats-count">{totalStats.deceased}</p>
        </li>
      </ul>
    )
  }

  renderHome = () => {
    const {stateWiseStatsList} = this.state

    return (
      <>
        <div className="home-container">
          {this.renderSearchContainer()}
          {this.renderStatsContainer()}

          <ul className="home-table-container" testid="stateWiseCovidDataTable">
            <li className="home-table-row">
              <div className="home-states-ut-sort-container">
                <p className="home-title-column">States/UT</p>
                <button
                  type="button"
                  testid="ascendingSort"
                  className="home-column-sort-btn"
                >
                  <FcGenericSortingAsc className="home-sort-icon" />
                </button>
                <button
                  type="button"
                  testid="descendingSort"
                  className="home-column-sort-btn"
                >
                  <FcGenericSortingDesc className="home-sort-icon" />
                </button>
              </div>
              <p className="home-confirmed-column home-title-column">
                Confirmed
              </p>
              <p className="home-active-column home-title-column">Active</p>
              <p className="home-recovered-column home-title-column">
                Recovered
              </p>
              <p className="home-deceased-column home-title-column">Deceased</p>
              <p className="home-population-column home-title-column">
                Population
              </p>
            </li>
            <hr className="home-table-separator" />
            {stateWiseStatsList.map(eachItem => (
              <li key={eachItem.stateCode} className="home-table-row">
                <p className="home-states-column">{eachItem.name}</p>
                <p className="home-confirmed-column">{eachItem.confirmed}</p>
                <p className="home-active-column">{eachItem.active}</p>
                <p className="home-recovered-column">{eachItem.recovered}</p>
                <p className="home-deceased-column">{eachItem.deceased}</p>
                <p className="home-population-column">{eachItem.population}</p>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  renderLoader = () => (
    <div className="home-loader-container" testid="homeRouteLoader">
      <Loader type="TailSpin" color="#007BFF" height="50" width="50" />
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHome()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <Header home />
        <div className="app-content-container">{this.renderContent()}</div>
      </div>
    )
  }
}
export default Home

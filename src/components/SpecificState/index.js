import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import TotalStateStats from '../TotalStateStats'
import TopDistrictBarGraph from '../TopDistrictBarGraph'
import DailySpreadTrendsGraph from '../DailySpreadTrendsGraph'
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

const statsConstants = [
  {
    statsId: 'CONFIRMED',
    statsValue: 'confirmed',
  },
  {
    statsId: 'ACTIVE',
    statsValue: 'active',
  },
  {
    statsId: 'RECOVERED',
    statsValue: 'recovered',
  },
  {
    statsId: 'DECEASED',
    statsValue: 'deceased',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class SpecificState extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    specificStateData: {},
    activeTab: 'CONFIRMED',
    specificStateTimelineData: [],
  }

  componentDidMount() {
    this.getSpecificStateStats()
    this.getSpecificStateTimeline()
  }

  getSpecificStateStats = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const stateName = statesList.find(
      eachItem => eachItem.state_code === stateCode,
    ).state_name

    const apiStatsUrl = `https://apis.ccbp.in/covid19-state-wise-data`
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(apiStatsUrl)
    const statsData = await response.json()
    // console.log(statsData)

    const specificStateData = {...statsData[stateCode], stateName}
    // console.log(specificStateData.districts)

    const updatedDistrictData = this.convertObjectsDataIntoListItems(
      specificStateData.districts,
    )
    // console.log(updatedDistrictData)

    this.setState({
      specificStateData: {...specificStateData, districts: updatedDistrictData},
      apiStatus: apiStatusConstants.success,
    })
  }

  getSpecificStateTimeline = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const apiTimelineUrl = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const response = await fetch(apiTimelineUrl)
    const timelineData = await response.json()
    // console.log(timelineData[stateCode])
    const resultList = []
    const keyNames = Object.keys(timelineData[stateCode].dates)

    // console.log(keyNames)
    keyNames.forEach(date => {
      //   const confirmed = date.total.confirmed
      //   const deceased = date.total.deceased
      //   const recovered = date.total.recovered
      //   const tested = date.total.tested
      const {total} = timelineData[stateCode].dates[date]

      resultList.push({
        date,
        confirmed: total.confirmed,
        deceased: total.deceased,
        recovered: total.recovered,
        tested: total.tested,
        active: total.confirmed - (total.deceased + total.recovered),
      })
    })

    // console.log(resultList)
    this.setState({specificStateTimelineData: resultList})
  }

  convertObjectsDataIntoListItems = districtData => {
    const resultList = []
    // getting keys of an object object
    const keyNames = Object.keys(districtData)
    // console.log(keyNames)

    keyNames.forEach(keyName => {
      // console.log(keyName)
      if (districtData[keyName]) {
        const {total} = districtData[keyName]
        // if the state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        // console.log(confirmed, deceased, recovered, tested)

        resultList.push({
          districtName: keyName,
          confirmed,
          deceased,
          recovered,
          tested,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  onChangeActiveTab = activeTab => {
    this.setState({activeTab})
  }

  renderTopDistrict = () => {
    const {specificStateData, activeTab, specificStateTimelineData} = this.state
    const {districts} = specificStateData
    // console.log(districts)
    // console.log(specificStateData)

    const activeStats = statsConstants.find(
      eachItem => eachItem.statsId === activeTab,
    ).statsValue
    // console.log(activeStats)

    return (
      <div className="specific-state-district-container">
        <h1
          className={`specific-state-top-district-title specific-state-district-text-${activeStats}`}
        >
          Top Districts
        </h1>
        <ul className="specific-state-top-districts-container">
          {districts.map(eachDistrict => (
            <li
              key={eachDistrict.districtName}
              className="specific-state-top-districts-item"
            >
              <p className="specific-state-top-districts-cases">
                {eachDistrict[activeStats]}
              </p>
              <p className="specific-state-top-districts-name">
                {eachDistrict.districtName}
              </p>
            </li>
          ))}
        </ul>
        <TopDistrictBarGraph
          activeTab={activeTab}
          timelineData={specificStateTimelineData}
        />
      </div>
    )
  }

  renderDailySpreadTrends = () => {
    const {specificStateTimelineData} = this.state

    return (
      <div className="daily-spread-trends-container">
        <h1 className="daily-spread-trends-title">Daily Spread Trends</h1>
        <DailySpreadTrendsGraph
          specificStateTimelineData={specificStateTimelineData}
        />
      </div>
    )
  }

  renderSpecificState = () => {
    const {specificStateData, activeTab} = this.state
    console.log(specificStateData)
    const {stateName, total, meta} = specificStateData
    const lastUpdated = meta.last_updated
    const date = new Date(lastUpdated)
    console.log(date)

    return (
      <>
        <div className="specific-state-container">
          <div className="state-title-container">
            <div className="state-date-container">
              <div className="state-name-container">
                <p className="state-name">{stateName}</p>
              </div>
              <p className="update-date">{`Last update on ${lastUpdated}.`}</p>
            </div>
            <div className="tested-container">
              <p className="tested-text">Tested</p>
              <p className="tested-value">{total.tested}</p>
            </div>
          </div>
          <TotalStateStats
            stats={specificStateData.total}
            activeTab={activeTab}
            onChangeActiveTab={this.onChangeActiveTab}
          />
          {this.renderTopDistrict()}
          {this.renderDailySpreadTrends()}
        </div>
        <Footer />
      </>
    )
  }

  renderStateDetailsLoader = () => (
    <div className="home-loader-container" testid="stateDetailsLoader">
      <Loader type="TailSpin" color="#007BFF" height="50" width="50" />
    </div>
  )

  renderTimelinesDataLoader = () => (
    <div className="home-loader-container" testid="timelinesDataLoader">
      <Loader type="TailSpin" color="#007BFF" height="50" width="50" />
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSpecificState()
      case apiStatusConstants.inProgress:
        return this.renderStateDetailsLoader()
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
export default SpecificState

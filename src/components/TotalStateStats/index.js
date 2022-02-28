import './index.css'

const TotalStateStats = props => {
  const {stats, activeTab, onChangeActiveTab} = props
  // console.log(activeTab, 'stats')

  const statsObjectList = [
    {
      statsText: 'Confirmed',
      statsId: 'CONFIRMED',
      quantity: stats.confirmed,
      imageUrl:
        'https://res.cloudinary.com/pradeep-5/image/upload/v1642662043/Covid%20Dashboard/check-mark_1confirmed-image_bzu5cv.png',
      className: 'confirmed',
    },
    {
      statsText: 'Active',
      statsId: 'ACTIVE',
      quantity: stats.confirmed - (stats.recovered + stats.deceased),
      imageUrl:
        'https://res.cloudinary.com/pradeep-5/image/upload/v1642662043/Covid%20Dashboard/protection_1active-image_eaymbh.png',
      className: 'active',
    },
    {
      statsText: 'Recovered',
      statsId: 'RECOVERED',
      quantity: stats.recovered,
      imageUrl:
        'https://res.cloudinary.com/pradeep-5/image/upload/v1642662043/Covid%20Dashboard/recovered_1recovered-image_gxmuvd.png',
      className: 'recovered',
    },
    {
      statsText: 'Deceased',
      statsId: 'DECEASED',
      quantity: stats.deceased,
      imageUrl:
        'https://res.cloudinary.com/pradeep-5/image/upload/v1642662043/Covid%20Dashboard/breathing_1deceased-image_vj8s36.png',
      className: 'deceased',
    },
  ]

  return (
    <ul className="specific-stats-card-container">
      {statsObjectList.map(eachItem => {
        const isActive = activeTab === eachItem.statsId
        const bgClassName = isActive
          ? `specific-stats-card-bg-${eachItem.className}`
          : ''

        return (
          <li
            className={`specific-stats-card specific-stats-card-${eachItem.className} ${bgClassName}`}
            testid="countryWideConfirmedCases"
            key={eachItem.statsId}
            onClick={() => {
              onChangeActiveTab(eachItem.statsId)
            }}
          >
            <p className="specific-stats-text">{eachItem.statsText}</p>
            <img
              src={eachItem.imageUrl}
              alt="country wide confirmed cases pic"
              className="specific-stats-image"
            />
            <p className="specific-stats-count">{eachItem.quantity}</p>
          </li>
        )
      })}
    </ul>
  )
}
export default TotalStateStats

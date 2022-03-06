import {XAxis, YAxis, Tooltip, BarChart, Bar, LabelList} from 'recharts'

import './index.css'

const statsConstants = [
  {
    statsId: 'CONFIRMED',
    statsValue: 'confirmed',
    strokeColor: '#9A0E31',
  },
  {
    statsId: 'ACTIVE',
    statsValue: 'active',
    strokeColor: '#0A4FA0',
  },
  {
    statsId: 'RECOVERED',
    statsValue: 'recovered',
    strokeColor: '#216837',
  },
  {
    statsId: 'DECEASED',
    statsValue: 'deceased',
    strokeColor: '#474C57',
  },
]

const TopDistrictBarGraph = props => {
  const {timelineData, activeTab} = props
  // console.log(activeTab)
  const activeStatObject = statsConstants.find(
    eachItem => eachItem.statsId === activeTab,
  )
  // console.log(activeStatObject)
  const arrLength = timelineData.length
  const lastTenDaysData = timelineData.slice(arrLength - 10, arrLength)
  // console.log(lastTenDaysData)

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="bargraph-container">
      <BarChart width={1032} height={431} data={lastTenDaysData}>
        <XAxis
          dataKey="date"
          tick={{
            stroke: activeStatObject.strokeColor,
            strokeWidth: 1,
          }}
        />
        <YAxis
          hide
          tickFormatter={DataFormatter}
          tick={{
            stroke: activeStatObject.strokeColor,
            strokeWidth: 1,
          }}
        />
        <Tooltip />
        <Bar
          dataKey={activeStatObject.statsValue}
          fill={activeStatObject.strokeColor}
          barSize="20%"
          className="bar"
          radius={[8, 8, 0, 0]}
          label={{
            position: 'top',
            datakey: activeStatObject.statsValue,
            fill: activeStatObject.strokeColor,
          }}
        />
      </BarChart>
    </div>
  )
}
export default TopDistrictBarGraph

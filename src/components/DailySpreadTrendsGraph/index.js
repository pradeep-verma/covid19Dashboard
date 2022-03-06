import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from 'recharts'

import './index.css'

const data = [
  {date: '23-02-2017', count: 200},
  {date: '24-02-2017', count: 400},
  {date: '23-02-2017', count: 100},
  {date: '23-02-2017', count: 200},
  {date: '24-02-2017', count: 300},
  {date: '23-02-2017', count: 200},
  {date: '24-02-2017', count: 400},
  {date: '23-02-2017', count: 600},
]

const statsConstants = [
  {
    statsId: 'CONFIRMED',
    statsValue: 'confirmed',
    statsText: 'Confirmed',
    strokeColor: '#FF073A',
  },
  {
    statsId: 'ACTIVE',
    statsValue: 'active',
    statsText: 'Total Active',
    strokeColor: '#007BFF',
  },
  {
    statsId: 'RECOVERED',
    statsValue: 'recovered',
    statsText: 'Recovered',
    strokeColor: '#27A243',
  },
  {
    statsId: 'DECEASED',
    statsValue: 'deceased',
    statsText: 'Deceased',
    strokeColor: '#6C757D',
  },
  {
    statsId: 'TESTED',
    statsValue: 'tested',
    statsText: 'Tested',
    strokeColor: '#9673B9',
  },
]

const DailySpreadTrendsGraph = props => {
  const {specificStateTimelineData} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div
      className="daily-spread-trends-graphs-container"
      testid="lineChartsContainer"
    >
      {statsConstants.map(eachStat => (
        <div
          className={`line-chart-container line-chart-bg-${eachStat.statsValue}`}
          key={eachStat.statsId}
        >
          <p
            className={`line-chart-text line-chart-text-${eachStat.statsValue}`}
          >
            {eachStat.statsText}
          </p>
          <LineChart
            width={1100}
            height={270}
            data={specificStateTimelineData}
            margin={{top: 0, right: 30, left: 20, bottom: 20}}
            className="line-chart"
          >
            <XAxis
              dataKey="date"
              tick={{
                stroke: eachStat.strokeColor,
                strokeWidth: 1,
              }}
            />
            <YAxis
              tickFormatter={DataFormatter}
              tick={{
                stroke: eachStat.strokeColor,
                strokeWidth: 1,
              }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={eachStat.statsValue}
              stroke={eachStat.strokeColor}
            />
          </LineChart>
        </div>
      ))}
    </div>
  )
}
export default DailySpreadTrendsGraph

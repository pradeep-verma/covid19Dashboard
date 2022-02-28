import React from 'react'
import './index.css'

import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'

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

const TopDistrictBarGraph = props => {
  const {timelineData} = props

  return (
    <div className="bargraph-container">
      <BarChart width={800} height={450} data={data}>
        <CartesianGrid strokeDasharray="" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="count"
          fill="#8884d8"
          className="bar"
          label={{position: 'top', color: 'white'}}
        />
      </BarChart>
    </div>
  )
}
export default TopDistrictBarGraph

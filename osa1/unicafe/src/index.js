import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if ((props.good + props.neutral + props.bad)===0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="Good: " value={props.good}/>
            <StatisticLine text="Neutral: " value={props.neutral}/>
            <StatisticLine text="Bad: " value={props.bad}/>
            <StatisticLine text="All: " value={props.good + props.neutral + props.bad}/>
            <StatisticLine text="Average: " value={(props.good - props.bad)/(props.good + props.neutral + props.bad)}/>
            <StatisticLine text="Positive: " value={`${props.good / (props.good + props.neutral + props.bad) * 100} %`}/>
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <p>
        <Button handleClick={() => setGood(good+1)} text="Good"/>
        <Button handleClick={() => setNeutral(neutral+1)} text="Neutral"/>
        <Button handleClick={() => setBad(bad+1)} text="Bad"/>
      </p>
    <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
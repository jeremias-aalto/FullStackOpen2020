import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0])

  const newVotes = () => {
    let newVotes = [...votes]
    newVotes[selected] += 1
    return (
      newVotes
    )
  }

  return (
    <div>
      <h1>Anecdote Of The Day</h1>
      {props.anecdotes[selected]}
      <p>Votes: {votes[selected]}</p>
      <p>
        <Button handleClick={() => setSelected(Math.floor(Math.random() * 6))} text="Next Anecdote"/>
        <Button handleClick={() => setVotes(newVotes)} text="Vote"/>
      </p>
      <h1>Anecdote With The Most Votes</h1>
      {props.anecdotes[votes.indexOf(Math.max(...votes))]}
      <p>Votes: {Math.max(...votes)}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
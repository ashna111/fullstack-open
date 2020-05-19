import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Header = (props) => <h1>{props.heading}</h1>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const generateRandomAnecdote = () => {
    const value = Math.floor(Math.random() * Math.floor(anecdotes.length));
    setSelected(value)
  }

  const voteCount = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const findMax = () => {
    let z = 0
    let index = 0
    points.forEach((value, i) => {
      if (z < value) {
        z = value
        index = i
      }
    })
    return index;
  }

  const max = findMax()

  return (
    <div>
      <Header heading="Anecdote of the day" />
      <div>{props.anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <button onClick={voteCount}>vote</button>
      <button onClick={generateRandomAnecdote}>next anecdote</button>

      <Header heading="Anecdote with most votes" />
      <div>{props.anecdotes[max]}</div>
      <div>has {points[max]} votes</div>
    </div>
  )
}
ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
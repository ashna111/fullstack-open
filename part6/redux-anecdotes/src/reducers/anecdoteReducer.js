export const createAnecdote = (anecdote) => {
  return { type: 'NEW_ANECDOTE', data: anecdote }
}

export const incrementVote = (id) => {
  return { type: 'INCREMENT_VOTE', data: { id } }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data

    case 'NEW_ANECDOTE':
      return state.concat(action.data)

    case 'INCREMENT_VOTE':
      let anecdote = state.find(a => a.id === action.data.id)
      anecdote.votes = anecdote.votes + 1
      return state.map(a => a.id === anecdote.id ? anecdote : a)

    case 'SORT_DEFAULT':
      return state.sort((a, b) => (b.votes - a.votes))

    default:
      return state.sort((a, b) => (b.votes - a.votes))
  }

}

export default reducer
import anecdoteService from '../services/anecdotes'

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const incrementVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'INCREMENT_VOTE',
      data: updatedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
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
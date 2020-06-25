import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    dispatch({ type: 'SORT_DEFAULT' })

    const vote = (id) => {
        console.log('vote', id)
        dispatch(incrementVote(id))
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList
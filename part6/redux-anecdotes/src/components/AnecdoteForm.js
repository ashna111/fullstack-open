import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNewAnecdote = async (event) => {
        event.preventDefault();
        const anecdote = event.target.text.value
        event.target.text.value = ''
        dispatch(createAnecdote(anecdote))
        dispatch(setNotification(`You created a new anecdote!`, 5))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createNewAnecdote}>
                <div><input name="text" /></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
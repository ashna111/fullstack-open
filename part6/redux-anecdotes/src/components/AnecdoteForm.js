import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNewAnecdote = (event) => {
        event.preventDefault();
        const anecdote = event.target.text.value
        event.target.text.value = ''
        dispatch(createAnecdote(anecdote))
        dispatch(setNotification(`You created a new anecdote!`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
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
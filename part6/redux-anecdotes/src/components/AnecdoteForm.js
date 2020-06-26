import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNewAnecdote = async (event) => {
        event.preventDefault();
        const anecdote = event.target.text.value
        event.target.text.value = ''
        const newAnecdote = await anecdoteService.createNew(anecdote)

        dispatch(createAnecdote(newAnecdote))
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
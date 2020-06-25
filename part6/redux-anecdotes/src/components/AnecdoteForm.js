import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNewAnecdote = (event) => {
        event.preventDefault();
        const anecdote = event.target.text.value
        event.target.text.value = ''
        dispatch(createAnecdote(anecdote))
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
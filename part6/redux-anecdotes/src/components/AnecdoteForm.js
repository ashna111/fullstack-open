import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const createNewAnecdote = async (event) => {
        event.preventDefault();
        const anecdote = event.target.text.value
        event.target.text.value = ''
        props.createAnecdote(anecdote)
        props.setNotification(`You created a new anecdote!`, 5)
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

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
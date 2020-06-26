import React from 'react'
import { connect } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    // dispatch({ type: 'SORT_DEFAULT' })

    const vote = (anecdote) => {
        props.incrementVote(anecdote)
        props.setNotification(`You voted for ${anecdote.content}`, 5)
    }

    return (
        <>
            {props.anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        notification: state.notification
    }
}

const mapDispatchToProps = {
    incrementVote,
    setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
import React from 'react'

const Notification = ({ message, messageState }) => {
    if (message == null) {
        return null
    }
    if (messageState === 'success') {
        return (
            <div className="success">
                {message}
            </div>
        )
    } else if (messageState === 'error') {
        return (
            <div className="error">
                {message}
            </div>
        )
    }


}

export default Notification
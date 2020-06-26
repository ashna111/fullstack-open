const filterReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIF':
            return action.message
        case 'REMOVE_NOTIF':
            return null
        default:
            return state
    }
}

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIF',
            message: content
        })
        setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000)
    }
}

export const removeNotification = () => {
    return { type: 'REMOVE_NOTIF' }
}

export default filterReducer
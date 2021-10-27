export const setChatLogs = (messages, recipient) => {
    return {
        type: 'SET_CONVERSATION',
        payload: {
            messages: messages,
            recipient: recipient
        }
    }
}

export const addMessage = (messages) => {
    return {
        type: 'ADD_NEW_MESSAGE',
        payload: messages
    }
}
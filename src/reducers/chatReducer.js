const initialState = {
    messages: [],
    recipient: {}
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {

        case "SET_CONVERSATION":
            return {
                ...state,
                messages: [...action.payload.messages],
                recipient: {...action.payload.recipient}
            }
        case "ADD_NEW_MESSAGE":
            return {
                ...state,
                messages: [...action.payload.chat_messages]
            }
        default:
            return state;
    }
}

export default chatReducer;
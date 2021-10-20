const initialState = {
    userFeed: [],
    userPage: 0
}

const subjectReducer = (state = initialState, action) => {
    switch (action.type) {

        case "ADD_NEXT_USER_PAGE":
            return {
                ...state,
                userFeed: [...state.userFeed, ...action.payload],
                userPage: state.userPage + 1
            }
        case 'SET_USER_FEED':
            return {
                ...state,
                userPage: 0,
                userFeed: [...action.payload],
            };
        default:
            return state;
    }
}

export default subjectReducer;
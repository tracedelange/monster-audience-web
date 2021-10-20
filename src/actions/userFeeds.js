export const setUserFeed = (feed) => {
    return {
        type: "SET_USER_FEED",
        payload: feed
    }
}

export const addNextUserPage = (newItems) => {
    return {
        type: "ADD_NEXT_USER_PAGE",
        payload: newItems
    }
}

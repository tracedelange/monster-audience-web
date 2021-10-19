export const setSubjects = (feed, type) => {
    return {
        type: "SET_SUBJECT_FEED",
        payload: {feed: feed, type: type}
    }
}

export const addNextSubjectsPage = (newItems) => {
    return {
        type: "ADD_NEXT_SUBJECT_PAGE",
        payload: {
            newItems: newItems,
        }
    }
}

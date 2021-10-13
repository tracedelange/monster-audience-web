export const setFeed = feed => {
    return {
      type: "SET_FEED",
      payload: feed
    }
  }

export const addReviewToFeed = (newReview, index) => {
  return {
    type: 'ADD_REVIEW',
    payload: {
      data:newReview,
      feedIndex: index}
  }
}

export const deleteReviewStore = (review_id) => {
  return {
    type: "DELETE_REVIEW",
    payload: review_id
  }
}
  
export const refreshFeed = (newItems) => {
    return {
      type: "REFRESH",
      payload: newItems
    }
  }
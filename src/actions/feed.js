export const setFeed = feed => {
    return {
      type: "SET_FEED",
      payload: feed
    }
  }
  
export const refreshFeed = (newItems) => {
    return {
      type: "REFRESH",
      payload: newItems
    }
  }
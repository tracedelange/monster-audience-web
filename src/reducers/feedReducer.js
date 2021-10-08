const initialState = {
    feed: []
  }
  
const feedReducer = (state=initialState, action) => {
    switch(action.type) {
      case "REFRESH":
        return {
            feed: [...state, action.payload]
        }
      case "SET_FEED":
        return {feed: [action.payload]};
      default:
        return state;
    }
  }
  
  export default feedReducer;
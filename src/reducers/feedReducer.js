const initialState = {
    feed: [],
    page: 0
  }
  
const feedReducer = (state=initialState, action) => {
    switch(action.type) {
      case "REFRESH":
        return {
            feed: [...state, action.payload]
        }
      case 'ADD_NEXT_PAGE':
        return {
          ...state,
          feed: [...state.feed, ...action.payload.newItems],
          page: state.page + 1
        }

      case "ADD_REVIEW":
        return {
          ...state,
          feed: state.feed.map(item => {
            if (item.id === action.payload.data.subject_id){
              return {
                ...item,
                reviews: [action.payload.data, ...item.reviews]
              }
            } else {
              return item
            }
          })
        }
      
      case "DELETE_REVIEW":
        return {
          ...state,
          feed: state.feed.map(item => {
            if (item.id !== action.payload.subject_id) {
              return item
            } else {
              return {
                ...item,
                reviews : [...item.reviews.filter(review => {
                  if (review.id !== action.payload.review_id){
                    return review
                  } else {
                    return null
                  }
                })]
              }
            }
          })
        }

      case "SET_FEED":
        return {
          ...state,
          feed: [...action.payload]
        };
      default:
        return state;
    }
  }
  
  export default feedReducer;
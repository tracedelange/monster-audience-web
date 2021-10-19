const initialState = {
    feedType: 'recent',
    subjectFeed: [],
    subjectPage: 0
  }
  
const subjectReducer = (state=initialState, action) => {
    switch(action.type) {

      case 'ADD_NEXT_SUBJECT_PAGE':
        return {
          ...state,
          subjectFeed: [...state.subjectFeed, ...action.payload.newItems],
          subjectPage: state.subjectPage + 1
        }
      case "SET_SUBJECT_FEED":
        return {    
          ...state,
          subjectPage: 0,
          subjectFeed: [...action.payload.feed],
          feedType: action.payload.type
        };
      default:
        return state;
    }
  }
  
  export default subjectReducer;
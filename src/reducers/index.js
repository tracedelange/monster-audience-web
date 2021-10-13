import { combineReducers } from "redux";
import sessionsReducer from './sessionsReducer'
import feedReducer from './feedReducer'

export default combineReducers({
  session: sessionsReducer,
  feed: feedReducer
})
// errors: errorsReducer,
// requesting: requestingReducer,
// videos: videosReducer
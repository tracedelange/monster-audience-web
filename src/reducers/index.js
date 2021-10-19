import { combineReducers } from "redux";
import sessionsReducer from './sessionsReducer'
import feedReducer from './feedReducer'
import subjectReducer from "./subjectsReducer";

export default combineReducers({
  session: sessionsReducer,
  feed: feedReducer,
  subjects: subjectReducer
})
// errors: errorsReducer,
// requesting: requestingReducer,
// videos: videosReducer
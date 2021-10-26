import { combineReducers } from "redux";
import sessionsReducer from './sessionsReducer'
import feedReducer from './feedReducer'
import subjectReducer from "./subjectsReducer";
import userFeedReducer from './userFeedReducer'
import chatReducer from './chatReducer'

export default combineReducers({
  session: sessionsReducer,
  feed: feedReducer,
  subjects: subjectReducer,
  userFeed: userFeedReducer,
  chatData: chatReducer
})
// errors: errorsReducer,
// requesting: requestingReducer,
// videos: videosReducer
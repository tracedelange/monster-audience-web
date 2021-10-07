import { combineReducers } from "redux";
import sessionsReducer from './sessionsReducer'

export default combineReducers({
  session: sessionsReducer,
})
// errors: errorsReducer,
// requesting: requestingReducer,
// videos: videosReducer
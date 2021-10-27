const initialState = {
    currentUser: {},
    loggedIn: false,
    base: ''
  }
  
const sessionsReducer = (state=initialState, action) => {
    switch(action.type) {
      case "LOGIN":
        return {
          currentUser: action.payload,
          loggedIn: true,
          base: `/home/${action.payload.user.username}`
        }
      case "LOGOUT":
        return initialState;
      default:
        return state;
    }
  }
  
  export default sessionsReducer;
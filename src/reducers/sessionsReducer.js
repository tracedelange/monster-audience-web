const initialState = {
    currentUser: {
      id: 6,
      first_name: "Bob",
      last_name: "Bob",
      email: "bob@test.com"
    },
    loggedIn: true
  }
  
  const sessionsReducer = (state=initialState, action) => {
    switch(action.type) {
      default:
        return state;
    }
  }
  
  export default sessionsReducer;
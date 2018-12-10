const authReducer = (state = {status: 'logged out', value: 'guest'}, action)=> {
  switch (action.type) {
    case 'LOGIN':
      console.log("login as:"+action.value);
      return Object.assign({}, state, {
        status: 'logged in',
        value: action.value
      })
    case 'LOGOUT':
      console.log("logout");
      return Object.assign({}, state, {
        status: 'logged out',
        value: action.value
      })
    default:
      return state;
  }
}
export default authReducer;
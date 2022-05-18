const userState = {
  user: {}
}

const auth = (state, action) => {
  switch (action.type) {
    case "setUser":
      return {
        user: action.user
      }
    default:
      return state
  }
}

export default auth
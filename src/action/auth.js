import api from "../api"
import qs from 'qs'

function setUserObj () {
  return {
    type: "setUser",
    user
  }
}

export function asyncSetUserObj () {
  return dispatch => {
    return api.login(qs.stringify(user)).then((res) => {
      console.log(res.data)
    }
    )
  }
}
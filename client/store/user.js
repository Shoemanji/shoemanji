import axios from 'axios'
import history from '../history'
import { deleteCurrentUser } from './users'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const updateUser = user => ({ type: UPDATE_USER, user })

/**
 * THUNK CREATORS
 */

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        res.data.pendingPwReset ?
        history.push(`/${res.data.id}/resetpw`) :
        history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

export const updateUserRole = (userId, isAdmin) => dispatch => {
  axios.put(`/api/users/${userId}`, isAdmin)
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
}

export const updateUserPassword = (userId, newpw, history) => dispatch => {
  axios.put(`/auth/${userId}/resetpw`, {password: newpw, pendingPwReset: false})
  .then((res) => {
    dispatch(updateUser(res.data))
    history.push('/home')
  })
  .catch(err => console.error(err));
}

export const forcePwReset = (userId) => dispatch => {
  axios.put(`/api/users/${userId}/forcereset`, {pendingPwReset: true})
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
}

export const deleteUser = userId => dispatch => {
  axios.delete(`/api/users/${userId}`)
    .then(res => {
      dispatch(deleteCurrentUser(userId));
    })
    .catch(err => console.error(err));
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}

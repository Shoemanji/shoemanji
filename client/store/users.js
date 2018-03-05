import axios from 'axios';

const GET_USERS = 'GET_USERS';
const DELETE_USER = 'DELETE_USER';

export const getUsers = users => ({ type: GET_USERS, users })
export const deleteCurrentUser = userId => ({ type: DELETE_USER, userId })

export default function reducer(users = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;

    case DELETE_USER:
      return users.filter(user => user.id !== action.userId)

    default:
      return users;
  }
}

export const fetchUsers = () => dispatch => {
  axios.get('/api/users')
  .then(res => {
    return res.data;
  })
  .then(users => {
    dispatch(getUsers(users))
  })
}

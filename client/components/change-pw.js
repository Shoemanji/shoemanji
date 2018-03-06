import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateUserPassword} from '../store'

const ChangePw = (props) => {
  const {name, displayName, handleSubmit, error, user} = props
  return (
    <div>
      <form onSubmit={(evt) => handleSubmit(evt, user)} name={name}>
        <div>
          <label htmlFor="newpw"><small>Enter New Password</small></label>
          <input name="newpw" type="password" />
        </div>
        <br />
        <div>
          <label htmlFor="confirmnewpw"><small>Confirm New Password</small></label>
          <input name="confirmnewpw" type="password" />
        </div>
        <br />
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapReset = (state) => {
  return {
    name: 'reset',
    displayName: 'Reset',
    user: state.user,
    error: state.user.error
  }
}
// const mapSignup = (state) => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.user.error
//   }
// }

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit (evt, user) {
      evt.preventDefault()
      const newpw = evt.target.newpw.value
      const confirmnewpw = evt.target.confirmnewpw.value
      const userid = user.id
      // const PwResetStatus = false
      // console.log(user)
      // console.log(PwResetStatus)
      if (newpw === confirmnewpw){
        dispatch(updateUserPassword(userid, newpw, ownProps.history))
      }
    }
  }
}

export const ResetPw = connect(mapReset, mapDispatch)(ChangePw)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

ChangePw.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  user: PropTypes.object,
  error: PropTypes.object
}

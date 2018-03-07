import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateUserPassword} from '../store'

const ChangePw = (props) => {
  const {name, displayName, handleSubmit, error, user} = props
  return (
    <div className="container">
      <h3>RESET YOUR PASSWORD</h3>
      <form onSubmit={(evt) => handleSubmit(evt, user)} name={name}>
        <div>
          <span>Enter New Password</span>
          <input name="newpw" type="password" />
        </div>
        <br />
        <div>
          <span>Confirm New Password</span>
          <input name="confirmnewpw" type="password" />
        </div>
        <br />
        <div>
          <button className="main-button" type="submit">{displayName}</button>
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

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit (evt, user) {
      evt.preventDefault()
      const newpw = evt.target.newpw.value
      const confirmnewpw = evt.target.confirmnewpw.value
      const userid = user.id
      if (newpw === confirmnewpw){
        dispatch(updateUserPassword(userid, newpw, ownProps.history))
      }
    }
  }
}

export const ResetPw = connect(mapReset, mapDispatch)(ChangePw)

ChangePw.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  user: PropTypes.object,
  error: PropTypes.object
}

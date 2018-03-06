import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn, isAdmin, user, pendingPwReset }) => (
  <div>
    <h1>SHOEMANJI</h1>
    <nav>
      {isLoggedIn && isAdmin ? (
        <div>
          <Link to="/orders/all">Manage Orders</Link>
          <Link to="/users/all">Manage Users</Link>
        </div>
      ) : (
          null
        )}
      {isLoggedIn && !pendingPwReset ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to={`/${user.id}/resetpw`}>Change Password</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <br />
          <Link to={`/user/${user.id}/orders`}>My Orders</Link>
          <Link to={`/user/${user.id}/reviews`}>My Reviews</Link>
          <br />
          <Link to="/products">All Products</Link>
          <Link to="/cart">Cart</Link>
        </div>
      ) : (null
        )}
      {isLoggedIn && pendingPwReset ? (
        <a href="#" onClick={handleClick}>
          Logout
      </a>
      ) : (null
        )}
      {!isLoggedIn ? (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <br /><br />
          <Link to="/products">All Products</Link>
          <Link to="/cart">Cart</Link>
        </div>
      ) : (null
        )}

    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
    user: state.user,
    pendingPwReset: state.user.pendingPwReset
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  pendingPwReset: PropTypes.bool
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  SingleProduct,
  AddReview,
  AllOrders,
  SingleOrder,
  Cart,
  Checkout,
  ProductForm,
  AllUsers,
  MyReviews,
} from './components';
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData();
  }

  render () {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:id/review" component={AddReview} />
        <Route exact path="/orders/all" component={AllOrders} />
        <Route exact path="/user/:id/orders" component={AllOrders} />
        <Route exact path="/orders/:id" component={SingleOrder} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/cart/checkout" component={Checkout} />
        <Route exact path="/user/:id/reviews" component={MyReviews} />
        <Route exact path="/products/:id/edit" component={ProductForm} />
        <Route exact path="/products/create" component={ProductForm} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/users/all" component={AllUsers} />
        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
            </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  };
}

const mapDispatch = dispatch => {
  return {
    loadInitialData () {
      dispatch(me());
    }
  };
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

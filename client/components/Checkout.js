import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { sendCart } from '../store';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    const { user, cart } = this.props;
    const email =  event.target.email.value;
    const address = event.target.address.value;
    const city = event.target.city.value;
    const state = event.target.state.value;
    const zip = event.target.zip.value;

    const reqBody = {
      cart,
      status: 'created',
      email,
      shippingAddress: `${address} ${city} ${state} ${zip}`,
      userId: user.id ? user.id : null,
    };
    this.props.sendCart(reqBody);
  }

  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <h1>Checkout</h1>
        <form onSubmit={this.handleSubmit}>
          <h4>Email</h4>
          <input required name="email" type="email" placeholder="email address..." value={user.email ? user.email : ''} />

          <h4>Address</h4>
          <input name="address" type="text" placeholder="shipping address..." />

          <h4>City</h4>
          <input name="city" type="text" placeholder="city..." />

          <h4>State</h4>
          <input name="state" type="text" maxLength="2" pattern="[a-zA-Z]{2}" placeholder="state..." />

          <h4>Zip Code</h4>
          <input name="zip" type="text" maxLength="5" pattern="[0-9]{5}" placeholder="zipcode..." />

          <br />
          <br />
          <button>PLACE ORDER</button>
        </form>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ cart, user }) => ({ cart, user })

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendCart: reqBody => dispatch(sendCart(reqBody, ownProps.history))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

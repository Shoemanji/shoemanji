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
    return (
      <div className="container">
        <h3>CHECKOUT</h3>
        <form onSubmit={this.handleSubmit}>
          <span>Email</span>
          <input required name="email" type="email" placeholder="email address..." />

          <span>Address</span>
          <input name="address" type="text" placeholder="shipping address..." />

          <span>City</span>
          <input name="city" type="text" placeholder="city..." />

          <span>State</span>
          <input name="state" type="text" maxLength="2" pattern="[a-zA-Z]{2}" placeholder="state..." />

          <span>Zip Code</span>
          <input name="zip" type="text" maxLength="5" pattern="[0-9]{5}" placeholder="zipcode..." />

          <br />
          <br />
          <button>PLACE ORDER</button>
        </form>
      </div>
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

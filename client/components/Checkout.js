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

    const address = event.target.address.value;
    const state = event.target.state.value;
    const zip = event.target.zip.value;

    const reqBody = {
      status: 'created',
      email: event.target.email.value,
      shippingAddress: `${address} ${state} ${zip}`,
    };

    this.props.sendCart(reqBody);
  }

  render() {
    return (
      <Fragment>
        <h1>Checkout</h1>
        <form onSubmit={this.handleSubmit}>
          <h4>Email</h4>
          <input required name="email" type="email" placeholder="email address..." />

          <h4>Shipping Address</h4>
          <input name="address" type="text" placeholder="shipping address..." />

          <h4>State</h4>
          <input name="state" type="text" maxLength="2" pattern="[a-zA-Z]{2}" placeholder="state..." />

          <h4>Zip Code</h4>
          <input name="zip" type="text" maxLength="5" pattern="[0-9]{5}" placeholder="zipcode..." />

          <br />
          <br />
          <button>Checkout</button>
        </form>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ cart }) => ({ cart })

const mapDispatchToProps = dispatch => ({
  sendCart: reqBody => dispatch(sendCart(reqBody))
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

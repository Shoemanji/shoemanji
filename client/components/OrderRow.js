import React from 'react';
import { Link } from 'react-router-dom';

export default class OrderRow extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { order, isAdmin } = this.props;

    return (
      <div>
        <h4>Order Id: {order.id} </h4>
        <h4>Status: {order.status}</h4>
        <Link to={`/orders/${order.id}`}>show order</Link>
      </div>
    )
  }
}
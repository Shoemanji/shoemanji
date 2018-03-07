import React from 'react';
import { Link } from 'react-router-dom';

export default class OrderRow extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { order, isAdmin } = this.props;

    return (
      <div className="row-container">
        <span>- Order#: {order.id} </span>
        <span>Status: {order.status}</span>
        <Link to={`/orders/${order.id}`}>show order</Link>
      </div>
    )
  }
}
import React from 'react';
import { connect } from 'react-redux';
import { fetchOrder, updateOrder } from '../store';

class SingleOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderStatus: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onUpdateOrderStatusClick = this.onUpdateOrderStatusClick.bind(this);
  }

  componentDidMount() {
    const orderId = Number(this.props.match.params.id);
    this.props.fetchOrder(orderId);
  }

  onChange(evt) {
    const orderStatus = evt.target.value;
    this.setState({ orderStatus })
  }

  onUpdateOrderStatusClick() {
    const status = this.state.orderStatus;
    const orderId = this.props.order[0].orderId;
    this.props.updateOrderStatus(orderId, { status });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order.length) {
      const orderHistory = nextProps.order[0];
      const orderStatus = orderHistory.order.status;
      this.setState({ orderStatus });
    }
  }

  render() {
    const { order, user } = this.props;
    const orderHistory = order[0];
    return (
      order, orderHistory ? (
        <div>
          {user.isAdmin ? (
            <div>
              <h4>Order Status</h4>
              <select name="status" value={this.state.orderStatus} onChange={this.onChange}>
                <option value="created">Created</option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
              <button onClick={(evt) => this.onUpdateOrderStatusClick(evt)}>UPDATE STATUS</button>
            </div>
          ) : (
            null
          )}
          <div> order ID: {orderHistory.orderId}</div>
          <div> Date Placed: {orderHistory.order.placedAt.substr(0, 10)}</div>
          <div> Shipping Address: {orderHistory.order.shippingAddress}</div>
          <div> Email: {orderHistory.order.email}</div>
          <ul>
            {this.props.order.map(lineItem =>
              (<li key={lineItem.id}>
                <div> Product name: {lineItem.product.title} </div>
                <div> Description: {lineItem.product.description}</div>
                <div> Quantity: {lineItem.quantity}</div>
                <div> Price: {lineItem.product.price}</div>
              </li>
              ))}
          </ul>
        </div>
      ) : null
    )
  }
}

const mapStateToProps = ({ order, user }) => ({ order, user })

const mapDispatchToProps = dispatch => ({
  fetchOrder: id => dispatch(fetchOrder(id)),
  updateOrderStatus: (orderId, orderStatus) => dispatch(updateOrder(orderId, orderStatus))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);

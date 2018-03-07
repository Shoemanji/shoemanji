import React from 'react';
import { connect } from 'react-redux';
import { fetchOrder, updateOrder } from '../store';
import { Link } from 'react-router-dom';

class SingleOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderStatus: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onUpdateOrderStatusClick = this.onUpdateOrderStatusClick.bind(this);
    this.renderLineItems = this.renderLineItems.bind(this);
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
    const email = this.props.order[0].order.email;

    const orderId = this.props.order[0].orderId;
    this.props.updateOrderStatus(orderId, { status, email });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order.length) {
      const orderHistory = nextProps.order[0];
      const orderStatus = orderHistory.order.status;
      this.setState({ orderStatus });
    }
  }

  renderLineItems() {
    return this.props.order.map(lineItem => {
      if (lineItem.product){
        return (
          <li className="cartRow-container" key={lineItem.id}>
            <img src={lineItem.product.image} />
            <Link to={`/products/${lineItem.product.id}`}>
              <div className="cartRow-product">{lineItem.product.title}</div>
            </Link>
            <div className="cartRow-details">{`price: $${lineItem.product.price}.00`}</div>
            <div className="cartRow-details">{`size: ${lineItem.product.size}`}</div>
            <div className="cartRow-details">Price: ${lineItem.priceAtPurchase}</div>
            <div className="cartRow-details">Quantity: {lineItem.quantity}</div>
          </li>
        )
      } else {
        return (
          <div>This line represents another product you purchased as part of this order that is no longer in the database.</div>
        )
      }
    })
  }

  render() {
    const { order, user } = this.props;
    const orderHistory = order[0];
    return (
      order, orderHistory ? (
        <div>
          {user.isAdmin ? (
            <div className="container single-order-selector">
              <span>Order Status</span>
              <select name="status" value={this.state.orderStatus} onChange={this.onChange}>
                <option value="created">Created</option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
              <button className="update-button" onClick={(evt) => this.onUpdateOrderStatusClick(evt)}>UPDATE STATUS</button>
            </div>
          ) : (
            null
          )}
          <div className="container row-container order-row-container">
            <span>Order# {orderHistory.orderId}</span>
            <span>Date Placed {orderHistory.order.placedAt.substr(0, 10)}</span>
            <span>Shipping Address {orderHistory.order.shippingAddress}</span>
            <span>Email {orderHistory.order.email}</span>
          </div>
            <ul className="container line-items-container">
              {this.renderLineItems()}
            </ul>
          </div>
      ) : null
    )
  }
}

const mapStateToProps = ({ order, user }) => ({ order, user })

const mapDispatchToProps = dispatch => ({
  fetchOrder: id => dispatch(fetchOrder(id)),
  updateOrderStatus: (orderId, orderData) => dispatch(updateOrder(orderId, orderData))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);

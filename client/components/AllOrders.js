import React from 'react';
import { connect } from 'react-redux';
import { fetchOrders, fetchAllOrders } from '../store';
import OrderRow from './OrderRow';

class AllOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayAllOrders: false,
    }
    this.updatePage = this.updatePage.bind(this);
  }

  componentDidMount() {
    if (this.props.match.path === '/orders/all') {
      this.props.fetchAllOrders()
    } else {
      const userId = Number(this.props.match.params.id)
      this.props.fetchOrders(userId)
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentPath = this.props.match.path;
    const newPath = nextProps.match.path;
    const shouldDisplayAllOrders = this.state.displayAllOrders;
    if (newPath === '/orders/all') {
      this.setState({ displayAllOrders: true })
    }
    if (currentPath !== newPath) {
      this.setState({ displayAllOrders: !shouldDisplayAllOrders })
      this.updatePage(!shouldDisplayAllOrders)
    }
  }

  updatePage(displayAllOrders) {
    if (displayAllOrders) {
      this.props.fetchAllOrders();
    } else {
      this.props.fetchOrders(this.props.user.id);
    }
  }

  render() {
    const { orders, user } = this.props
    return (
      orders.length ? (
        <div>
          <ul>
            {orders.map(order =>
              (<li key={order.id}>
                <OrderRow order={order} isAdmin={user.isAdmin} />
              </li>)
            )}
          </ul>
        </div>
      ) : (<h3>No Orders Found </h3>)
    )
  }
}

const mapStateToProps = ({ orders, user }) => ({ orders, user })

const mapDispatchToProps = dispatch => ({
  fetchOrders: userId => dispatch(fetchOrders(userId)),
  fetchAllOrders: () => dispatch(fetchAllOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);

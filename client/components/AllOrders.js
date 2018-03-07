import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchOrders, fetchAllOrders } from '../store';
import OrderRow from './OrderRow';
import OrderSelect from './OrderSelect';

class AllOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayAllOrders: false,
      currentStatus: 'ALL',
    }

    this.updatePage = this.updatePage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filteredRender = this.filteredRender.bind(this);
  }

  componentDidMount() {
    if (this.props.match.path === '/orders/all') {
      this.props.fetchAllOrders();
    } else {
      const userId = Number(this.props.match.params.id);
      this.props.fetchOrders(userId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentPath = this.props.match.path;
    const newPath = nextProps.match.path;
    const shouldDisplayAllOrders = this.state.displayAllOrders;
    if (newPath === '/orders/all') {
      this.setState({ displayAllOrders: true });
    }
    if (currentPath !== newPath) {
      this.setState({ displayAllOrders: !shouldDisplayAllOrders });
      this.updatePage(!shouldDisplayAllOrders);
    }
  }

  updatePage(displayAllOrders) {
    if (displayAllOrders) {
      this.props.fetchAllOrders();
    } else {
      this.props.fetchOrders(this.props.user.id);
    }
  }

  handleChange(event) {
    const currentStatus = event.target.value;
    this.setState({ currentStatus });
  }

  filteredRender(orders, statusFlag) {
    const { user } = this.props;

    if (!orders.length) return (<h3>No Orders Found </h3>);

    if (statusFlag === 'ALL') {
      return (
        <Fragment>
          <ul>
            {orders.map(order =>
              (<li key={order.id}>
                <OrderRow order={order} isAdmin={user.isAdmin} />
              </li>)
            )}
          </ul>
        </Fragment>);
    }

    return (
      <Fragment>
        <ul>
          {orders.filter(order => order.status === this.state.currentStatus).map(order =>
            (<li key={order.id}>
              <OrderRow order={order} isAdmin={user.isAdmin} />
            </li>)
          )}
        </ul>
    </Fragment>);
  }

  render() {
    const { orders } = this.props;
    const { currentStatus } = this.state;
    return (
      <Fragment>
        <OrderSelect handleChange={this.handleChange} />
        { this.filteredRender(orders, currentStatus) }
      </Fragment>
    )
  }
}

const mapStateToProps = ({ orders, user }) => ({ orders, user });

const mapDispatchToProps = dispatch => ({
  fetchOrders: userId => dispatch(fetchOrders(userId)),
  fetchAllOrders: () => dispatch(fetchAllOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);

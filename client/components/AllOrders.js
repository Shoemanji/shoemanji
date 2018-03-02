import React from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../store';
import OrderRow from './OrderRow';

class AllOrders extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const userId = Number(this.props.match.params.id)
        this.props.fetchOrders(userId)

    }
    render() {
        const { orders } = this.props
        return (
            orders.length ? (
                <div>
                    <ul>
                        {this.props.orders.map(order =>
                            (<li key={order.id}>
                                <OrderRow order={order} />
                            </li>)
                        )}
                    </ul>
                </div>
            ) : (<h3>No Orders Found </h3>)
        )
    }
}

const mapStateToProps = ({ orders }) => ({ orders })

const mapDispatchToProps = dispatch => ({
    fetchOrders: userId => dispatch(fetchOrders(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);

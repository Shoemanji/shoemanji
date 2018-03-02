import React from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../store';
import { Link } from 'react-router-dom';

class AllOrders extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const UserId = Number(this.props.match.params.id)
        this.props.fetchOrders(UserId)
    }
    render() {
        return (
            <div>
                <ul>
                    {this.props.orders && this.props.orders.map(order =>
                        (<li key={order.id}>
                            <Link to= {`/orders/${order.id}`}>{order.id}</Link>
                        </li>)
                    )}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ orders }) => ({ orders })

const mapDispatchToProps = dispatch => ({
    fetchOrders: id => dispatch(fetchOrders(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
// <OrderRow props={order}/>
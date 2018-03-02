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
        return (
            <div>
                <ul>
                    {this.props.orders && this.props.orders.map(order =>
                        (<li key={order.id}>
                            <OrderRow order={order} />
                        </li>)
                    )}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ orders }) => ({ orders })

const mapDispatchToProps = dispatch => ({
    fetchOrders: userId => dispatch(fetchOrders(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
// <OrderRow props={order}/>
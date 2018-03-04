import React from 'react';
import { connect } from 'react-redux';
import { fetchOrder } from '../store/order';

class SingleOrder extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const orderId = Number(this.props.match.params.id);
        this.props.fetchOrder(orderId);
    }
    render() {
        const { order } = this.props
        const orderHistory = this.props.order[0]

        return (
            order, orderHistory ? (
                <div>
                     <div> order ID: {orderHistory.id}</div>
                     <div> Date Placed: {orderHistory.order.placedAt.substr(0, 10)}</div>
                     <div> Shipping Address: {orderHistory.order.shippingAddress}</div>
                     <div> Email: {orderHistory.order.email}</div>
                    <ul>
                   
                        {this.props.order.map(lineItem =>
                            (<li key={order.id}>
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

const mapStateToProps = ({ order }) => ({ order })

const mapDispatchToProps = dispatch => ({
    fetchOrder: id => dispatch(fetchOrder(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);

import React from 'react';
import { connect } from 'react-redux';
import { fetchOrder } from '../store/order';

class SingleOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            order: props.order
        }
    }
    componentDidMount() {
        const orderId = Number(this.props.match.params.id);
        this.props.fetchOrder(orderId);
    }
    render() {
        const { order } = this.props
        return (
            order ? (
                <div>
                    {this.props.order.id}

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

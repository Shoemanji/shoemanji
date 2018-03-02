import React from 'react';
import { Link } from 'react-router-dom';

export default class OrderRow extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h4>{this.props.order.id} </h4>
                <Link to={`/orders/${this.props.order.id}`}>show order</Link>
            </div>
        )
    }
}
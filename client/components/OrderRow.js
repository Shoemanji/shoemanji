import React from 'react';
import { Link } from 'react-router-dom';

export default class OrderRow extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props.order)
        return (
            <div>
                <h4>{this.props.order.id} </h4>
                <Link to={`/orders/${this.props.order.id}`}>show order</Link>
            </div>
        )
    }
}
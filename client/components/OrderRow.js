import React from 'react';

class OrderRow extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
            {this.props.orders.id}
            </div>
        )
    }
}
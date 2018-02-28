import React, { Fragment } from 'react'; 
import { connect } from 'react-redux';

class Cart extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const { productsInCart } = this.props;
        return (
            productsInCart ? (
                <Fragment>
                    <h3>CART</h3>
                    {productsInCart.map(product => {
                        return (
                            <Fragment>
                                <div>{product.title}</div>
                                <div>{product.price}</div>
                            </Fragment>
                        )
                    })}
                </Fragment>
            ) : null
        )
    }
}

const mapStateToProps = ({ cart, products }) => {
    const productsInCart = cart.map(productId => {
        return products.find(product => {
            return product.id === productId;
        });
    })
    return {
        productsInCart,
    }
}
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

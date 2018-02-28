import React, { Fragment } from 'react'; 
import { connect } from 'react-redux';

class Cart extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const { productsInCart } = this.props;
        console.log('PRODUCTS IN CART', productsInCart);
        const keys = Object.keys(window.localStorage);
        
        // let test = [];
        // keys.forEach((key, i) => {
        //     console.log('index', i)
        //     console.log('KEY', key)
            
        //     if (key == `shoemanjiItem${i}`) {
        //         console.log('we here')
        //         test.push(window.localStorage[`shoemanjiItem${i}`])
        //     }
        // });
        // console.log('TEST', test);
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
    productsInCart.forEach(product => {
        window.localStorage.setItem(`shoemanjiProductId${product.id}`, JSON.stringify(product))
    })
    return {
        productsInCart,
    }
}
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

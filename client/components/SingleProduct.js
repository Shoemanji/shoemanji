import React from 'react'; 
import { connect } from 'react-redux';
import { fetchProduct } from '../store';
import { testLocalStorage } from '../store';

class SingleProduct extends React.Component {
    constructor(props){
        super(props)
        // this.state = {
        //     product: props.product
        // }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.fetchProduct(id);
    }

    render(){
        const { product, addToCart } = this.props
        return (
            product ? (
                <div>
                    <h3>{ product.title }</h3>
                    <button onClick={() => addToCart(product.id, quantity)}>ADD TO CART</button>
                    <input type="number" />
                </div>
            ) : null
        )
    }
}

const mapStateToProps = ({ product }) => ({ product })

const mapDispatchToProps = dispatch => ({
    fetchProduct: id => dispatch(fetchProduct(id)),
    addToCart: (id, quantity) => dispatch(testLocalStorage(id, quantity)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

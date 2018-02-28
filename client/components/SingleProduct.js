import React from 'react'; 
import { connect } from 'react-redux';
import { fetchProduct } from '../store';
import { addToCart } from '../store';

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
                    <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
                </div>
            ) : null
        )
    }
}

const mapStateToProps = ({ product }) => ({ product })

const mapDispatchToProps = dispatch => ({
    fetchProduct: id => dispatch(fetchProduct(id)),
    addToCart: id => dispatch(addToCart(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

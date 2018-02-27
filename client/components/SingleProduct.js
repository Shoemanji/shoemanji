import React from 'react'; 
import {connect} from 'react-redux';
import {fetchProduct} from '../store/products';

class SingleProduct extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            product: props.product
        }
    }
    render(){
        const {product} = this.props
        console.log(this.props)
        return (
            !product ? null :
            <div>
            {this.props.product.title}
            </div>
        )
    }
}
const mapStateToProps = ({products}, ownProps) => {
    const paramId = Number(ownProps.match.params.id)
    console.log(products)
    return {
        product: products.find(product => product.id === paramId)
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProduct: (product) => {
        dispatch(fetchProduct(product))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

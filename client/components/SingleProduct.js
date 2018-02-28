import React from 'react'; 
import { connect } from 'react-redux';
import { fetchProduct } from '../store/product';

class SingleProduct extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            product: props.product
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.fetchProduct(id);
    }

    render(){
        const {product} = this.props
        return (
            product ? (
                <div>
                    {this.props.product.title}
                </div>
            ) : null
        )
    }
}

const mapStateToProps = ({ product }) => ({ product })

const mapDispatchToProps = dispatch => ({
    fetchProduct: id => dispatch(fetchProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

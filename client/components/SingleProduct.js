import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/product';
import AllReviews from './AllReviews';
import { Link } from 'react-router-dom';


class SingleProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: props.product
        }
    }

    componentDidMount() {
        const productId = Number(this.props.match.params.id);
        this.props.fetchProduct(productId);
    }
    render() {
        const { product } = this.props
        return (
            product ? (
                <div>
                    <Link to={`/products/${product.id}/review`}><button>add review</button></Link>
                    <br /><br />
                    {this.props.product.title}
                    <AllReviews productId={this.props.product.id} />
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

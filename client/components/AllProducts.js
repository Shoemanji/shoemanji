import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import { Link } from 'react-router-dom';

class AllProducts extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.fetchInitialData();
    }
    render() {
        return (
            <div>
                <ul>
                    {this.props.products && this.props.products.map(product =>
                        (<li key={product.id}>
                            <Link to={`/products/${product.id}`}>{product.id}</Link>
                        </li>)
                    )}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = ({ products }) => ({ products})

const mapDispatchToProps = dispatch => ({
    fetchInitialData: () =>  dispatch(fetchProducts())
});
//need to add product POST request

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
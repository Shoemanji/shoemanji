import React from 'react'; 
import {connect} from 'react-redux';
import {fetchProducts} from '../store/products';

class AllProducts extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.fetchInitialData();
    }
    render(){
        return (
            <div>
            <ul>
             {this.props.products && this.props.products.map(product =>
                <li key={product.id}> {product.id}</li>
            )}
            </ul>
            </div>
        )
    }
}
const mapStateToProps = state => (
    {
        products: state.products
    })

const mapDispatchToProps = dispatch => ({
    fetchInitialData: () => {
        dispatch(fetchProducts())
    }
});
//need to add product POST request

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
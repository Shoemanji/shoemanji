import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, addToCart } from '../store';
import FilterInput from './FilterInput';


class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      inputValue: '',
    }
    this.onAddToCartClick = this.onAddToCartClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchInitialData();
  }

  handleChange(event) {
    const inputValue = event.target.value;
    this.setState({ inputValue });
  }

  onAddToCartClick(product) {
    const { quantity } = this.state;
    this.props.addToCart({ product, quantity });
  }

  onNewProductClick() {
    console.log('create');
  }

  onProductDeleteClick() {
    console.log('delete');
  }

  onProductEditClick() {
    console.log('edit');
  }

  render() {
    const { products, isAdmin } = this.props;
    const inputValue = this.state.inputValue;
    const regex = new RegExp(inputValue, 'i');
    const filteredProducts = products.filter(product => product.title.match(regex));
    return (
      <div>
        {isAdmin ? (
            <Link to="/products/new">
              <button onClick={() => this.onNewProductClick()}>CREATE NEW PRODUCT</button>
            </Link>
          ) :
          (null)
        }
        <FilterInput handleChange={this.handleChange} inputValue={inputValue} />
        <ul>
          {(inputValue)
            ? filteredProducts.map(product =>
              (<li key={product.id}>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
                <button onClick={() => this.onAddToCartClick(product)}>ADD TO CART</button>
              </li>))
            : products && products.map(product =>
              (<li key={product.id}>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
                <button onClick={() => this.onAddToCartClick(product)}>ADD TO CART</button>
                {isAdmin ? (
                  <div>
                    <button onClick={() => this.onProductDeleteClick()}>DELETE PRODUCT</button>
                    <Link to={`/products/${product.id}/edit`}>
                      <button onClick={() => this.onProductEditClick()}>EDIT PRODUCT</button>
                    </Link>
                  </div>
                ) : (
                  null
                )}
              </li>)
            )
          }
        </ul>
      </div>
    )
  }
}
const mapStateToProps = ({ products, user }) => { 
  return {
    isAdmin: user.isAdmin,
    products,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchInitialData: () => dispatch(fetchProducts()),
  addToCart: cartRow => dispatch(addToCart(cartRow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);

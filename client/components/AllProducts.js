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

  render() {
    const { products } = this.props;
    const inputValue = this.state.inputValue;
    const regex = new RegExp(inputValue, 'i');
    const filteredProducts = products.filter(product => product.title.match(regex));
    return (
      <div>
        <FilterInput handleChange={this.handleChange} inputValue={inputValue} />
        <ul>
          {(inputValue)
            ? filteredProducts.map(product =>
              (<li key={product.id}>
                <img width="200" src={  product.image } />
                <Link to={`/products/${product.id}`}>{product.title}</Link>
                <button onClick={() => this.onAddToCartClick(product)}>ADD TO CART</button>
              </li>))
            : products && products.map(product =>
              (<li key={product.id}>
                <img width="200" src={  product.image } />
                <Link to={`/products/${product.id}`}>{product.title}</Link>
                <button onClick={() => this.onAddToCartClick(product)}>ADD TO CART</button>
              </li>)
            )
          }
        </ul>
      </div>
    )
  }
}
const mapStateToProps = ({ products }) => ({ products })

const mapDispatchToProps = dispatch => ({
  fetchInitialData: () => dispatch(fetchProducts()),
  addToCart: cartRow => dispatch(addToCart(cartRow)),
});
//need to add product POST request

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);

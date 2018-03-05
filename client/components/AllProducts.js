import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, addToCart, deleteProduct } from '../store';
import FilterInput from './FilterInput';
import CategorySelect from './CategorySelect';

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

  onProductDeleteClick(productId) {
    this.props.deleteProduct(productId);
  }

  render() {
    const { products, isAdmin, category } = this.props;
    const inputValue = this.state.inputValue;
    const regex = new RegExp(inputValue, 'i');

    return (
      <div>
        {isAdmin ? (
            <Link to="/products/create">
              <button>CREATE NEW PRODUCT</button>
            </Link>
          ) :
          (null)
        }
        <FilterInput handleChange={this.handleChange} inputValue={inputValue} />
        <br />
        <CategorySelect />
        <ul>
          {
            (category === 'ALL' || !category)
              ? products && products
                  .filter(product => product.title.match(regex))
                  .map(product =>
                    (<li key={product.id}>
                      <img width="200" src={  product.image } />
                      <Link to={`/products/${product.id}`}>{product.title}</Link>
                      <button onClick={() => this.onAddToCartClick(product)}>ADD TO CART</button>
                      {isAdmin ? (
                        <div>
                          <button onClick={() => this.onProductDeleteClick(product.id)}>DELETE PRODUCT</button>
                          <Link to={`/products/${product.id}/edit`}>
                            <button>EDIT PRODUCT</button>
                          </Link>
                        </div>
                      ) : (
                        null
                      )}
                    </li>))
              : products.filter(product => product.categories.includes(category))
                  .filter(product => product.title.match(regex))
                  .map(product => {
                    return (
                      <li key={product.id}>
                        <img width="200" src={  product.image } />
                        <Link to={`/products/${product.id}`}>{product.title}</Link>
                        <button onClick={() => this.onAddToCartClick(product)}>ADD TO CART</button>
                      </li>
                    );
                  })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ products, user, category }) => {
  return {
    isAdmin: user.isAdmin,
    products,
    category
  }
}

const mapDispatchToProps = dispatch => ({
  fetchInitialData: () => dispatch(fetchProducts()),
  addToCart: cartRow => dispatch(addToCart(cartRow)),
  deleteProduct: productId => dispatch(deleteProduct(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);

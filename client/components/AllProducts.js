import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import { Link } from 'react-router-dom';
import FilterInput from './FilterInput';

class AllProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      inputValue: value,
    });
  }

  componentDidMount() {
    this.props.fetchInitialData();
  }

  render() {
    const { products } = this.props;
    const inputValue = this.state.inputValue;
    const re = new RegExp(inputValue, 'i');
    const filteredProducts = products.filter(product => product.title.match(re));

    return (
      <div>
        <FilterInput handleChange={this.handleChange} inputValue={inputValue} />
        <ul>
          { (inputValue)
            ? filteredProducts.map(product =>
              (<li key={product.id}>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
              </li>))
            : products && products.map(product =>
              (<li key={product.id}>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
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
  fetchInitialData: () => dispatch(fetchProducts())
});
//need to add product POST request

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);

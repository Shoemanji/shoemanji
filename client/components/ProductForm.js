import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchProduct, editProduct, createProduct } from '../store';
import AllOrders from '.';

class ProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isNewProduct: null,
    }
    this.generateTitle = this.generateTitle.bind(this);
    this.onEditProductClick = this.onEditProductClick.bind(this);
    this.onCreateNewProductClick = this.onCreateNewProductClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const productId = +this.props.match.params.id;
    this.props.fetchProduct(productId);
  }

  generateTitle(isNewProduct) {
    let title = null;
    if (isNewProduct) {
      title = <h3>NEW PRODUCT</h3>
    } else {
      title = <h3>EDIT PRODUCT</h3>
    }
    return title;
  }

  onEditProductClick(evt) {
    console.log('edit')
    // const title = evt.target.title.value;
    // const description = evt.target.description.value;
    // const price = evt.target.price.value;
    // const inventory = evt.target.inventory.value;
    // const category = evt.target.inventory.category;

    // const reqBody = {
    //   title,
    //   description,
    //   price,
    //   inventory,
    //   category,
    // }

    // this.props.createProduct(reqBody);
  }

  onCreateNewProductClick(evt) {
    console.log('create')
    // const title = evt.target.title.value;
    // const description = evt.target.description.value;
    // const price = evt.target.price.value;
    // const inventory = evt.target.inventory.value;
    // const category = evt.target.inventory.category;

    // const reqBody = {
    //   title,
    //   description,
    //   price,
    //   inventory,
    //   category,
    // }

    // this.props.editProduct(reqBody);
  }

  onSubmit(isNewProduct) {
    // evt.preventDefault();
    if (isNewProduct) {
      return this.onCreateNewProductClick()
    } else {
      return this.onEditProductClick()
    }
  }

  render() {
    const isNewProduct = this.props.match.path === '/products/new' ? true : false;
    const { product } = this.props;
    return (
      <Fragment>
        {this.generateTitle(isNewProduct)}
        <form onSubmit={this.onSubmit(isNewProduct)}>
          <h4>TITLE</h4>
          <input required name="title" type="text" placeholder="title" value={product.title && !isNewProduct ? product.title : null} />

          <h4>DESCRIPTION</h4>
          <textarea name="description" type="text" placeholder="description" value={product.description && !isNewProduct ? product.description : null} ></textarea>

          <h4>PRICE</h4>
          <input name="price" type="number" pattern="[0-9]" placeholder="price" value={product.price && !isNewProduct ? product.price : null} />

          <h4>INVENTORY</h4>
          <input name="inventory" type="text" pattern="[0-9]" placeholder="inventory" value={product.inventory && !isNewProduct ? product.inventory : null} />

          <h4>CATEGORY</h4>
          <input name="category" type="text" placeholder="category" value={product.category && !isNewProduct ? product.category : null} />
          <br />
          <br />
          <button>EDIT</button>
        </form>
      </Fragment>
    )
  }
}

// [] checkbox for categories
// [] view all AllOrders
// [] filter AllOrders / update AllOrders

// [] user management

const mapState = ({ product }) => ({ product });

const mapDispatch = dispatch => ({
  fetchProduct: id => dispatch(fetchProduct(id)),
  editProduct: id => dispatch(editProduct(id)),
  createProduct: product => dispatch(createProduct(product)),
});

export default connect(mapState, mapDispatch)(ProductForm);
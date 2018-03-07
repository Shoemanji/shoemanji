import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchProduct, editProduct, createProduct, fetchProducts } from '../store';

class ProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeCheckboxes: {},
      title: '',
      description: '',
      price: null,
      inventory: null,
      image: '',
      newCategory: '',
    }
    this.generateTitle = this.generateTitle.bind(this);
    this.onEditProductClick = this.onEditProductClick.bind(this);
    this.onCreateNewProductClick = this.onCreateNewProductClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.createReqBody = this.createReqBody.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchInitialData();
    if (this.props.match.params.id) {
      const productId = +this.props.match.params.id;
      this.props.fetchProduct(productId);
    }
  }

  resetForm() {
    this.setState({
      activeCheckboxes: {},
      title: '',
      description: '',
      price: '',
      inventory: '',
      image: '',
      newCategory: '',
    });
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

  onCheckboxChange(evt) {
    const category = evt.target.name;
    const isChecked = evt.target.checked;
    this.setState(prevState => ({
      ...prevState,
      activeCheckboxes: {...prevState.activeCheckboxes, [`${category}`]: isChecked},
    }));
  }

  onInputChange(evt) {
    let title;
    let description;
    let price;
    let inventory;
    let image;
    let newCategory;
    switch (evt.target.name) {
      case 'title':
        title = evt.target.value;
        this.setState({ title });
        break;

      case 'description':
        description = evt.target.value;
        this.setState({ description });
        break;

      case 'price':
        price = evt.target.value;
        this.setState({ price });
        break;

      case 'inventory':
        inventory = evt.target.value;
        this.setState({ inventory });
        break;

      case 'image':
        image = evt.target.value;
        this.setState({ image });
        break;

      case 'newCategory':
        newCategory = evt.target.value;
        this.setState({ newCategory });
        break;

      default:
        return;
    }
  }

  getCategories() {
    let categories = this.props.categories.filter(category => {
      if (this.state.activeCheckboxes[category]) {
        return category;
      }
    })
    if (this.state.newCategory) {
      categories.push(this.state.newCategory)
    }
    return categories;
  }

  createReqBody() {
    const {
      title,
      description,
      price,
      inventory,
      // image,
    } = this.state;

    const reqBody = {
      title,
      description,
      price,
      inventory,
      image: this.state.image ? this.state.image : 'https://i.imgur.com/pXes8hO.jpg',
      categories: this.getCategories(),
    }
    return reqBody;
  }

  onEditProductClick(evt) {
    const reqBody = this.createReqBody(evt);
    const productId = this.props.match.params.id;
    this.props.editProduct(reqBody, productId);
  }

  onCreateNewProductClick(evt) {
    const reqBody = this.createReqBody(evt);
    this.props.createProduct(reqBody);
  }

  onSubmit(evt, isNewProduct) {
    evt.preventDefault();
    if (isNewProduct) {
      return this.onCreateNewProductClick(evt)
    } else {
      return this.onEditProductClick(evt)
    }
  }

  componentWillReceiveProps(nextProps) {
    const newPath = nextProps.match.path;
    let activeCheckboxes = {};
    if (
      Object.keys(nextProps.product).length !== 0 &&
      nextProps.product.constructor === Object &&
      newPath !== '/products/create'
    ) {
      nextProps.product.categories.forEach(category =>
        activeCheckboxes[category] = true
      )
      this.setState({
        title: nextProps.product.title,
        description: nextProps.product.description,
        price: nextProps.product.price,
        inventory: nextProps.product.inventory,
        image: nextProps.product.image,
        activeCheckboxes,
      })
    }
  }

  componentWillUnmount() {
    this.resetForm();
  }

  render() {
    const { categories } = this.props;
    const isNewProduct = this.props.match.path === '/create';
    return (
      <div className="container">
        {this.generateTitle(isNewProduct)}
        <form onSubmit={(evt) => this.onSubmit(evt, isNewProduct)}>
          <span>TITLE</span>
          <input required name="title" type="text" value={this.state.title} onChange={this.onInputChange} />

          <span>DESCRIPTION</span>
          <textarea name="description" type="text" value={this.state.description} onChange={this.onInputChange} />

          <span>PRICE</span>
          <input name="price" type="number" pattern="[0-9]" value={this.state.price} onChange={this.onInputChange} />

          <span>INVENTORY</span>
          <input name="inventory" type="number" pattern="[0-9]" value={this.state.inventory} onChange={this.onInputChange} />

          <span>IMAGE</span>
          <input name="image" type="text" value={this.state.image} onChange={this.onInputChange} />

          <span>CATEGORIES</span>
          {
            categories.map(category => {
              return (
                <div className="checkbox" key={category}>
                  <input type="checkbox" name={category} value={category} checked={this.state.activeCheckboxes[category]} onChange={(evt) => this.onCheckboxChange(evt, category)} />
                  <span>{category}</span>
                </div>
              )
            })
          }
          <span>Add new Category</span>
          <input name="newCategory" type="text" onChange={this.onInputChange} />
          {isNewProduct ? (
            <button className="main-button">CREATE</button>
          ) : (
            <button className="main-button">EDIT</button>
          )}
        </form>
      </div>
    )
  }
}

const mapState = ({ product, categories }) => ({ product, categories });

const mapDispatch = (dispatch, ownProps) => ({
  fetchInitialData: () => dispatch(fetchProducts()),
  fetchProduct: id => dispatch(fetchProduct(id)),
  editProduct: (reqBody, productId) => dispatch(editProduct(reqBody, productId, ownProps.history)),
  createProduct: product => dispatch(createProduct(product, ownProps.history)),
});

export default connect(mapState, mapDispatch)(ProductForm);

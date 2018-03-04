import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getCategory } from '../store';

class CategorySelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const category = event.target.value;
    this.props.getCategory(category);
    console.log('current category:', category)
  }

  render() {
    const { products } = this.props;
    let uniqueCategories = new Set();
    return (
      <Fragment>
        <form>
          <label>
            Sort by Category
          <select onChange={this.handleChange}>
            <option value={'ALL'}> -- ALL -- </option>
              {
                products && products.map(product => {
                  uniqueCategories.add(product.category);
                })
              }
              {
                Array.from(uniqueCategories).sort().map(category => {
                  return (
                    <option key={category} value={category}>{category}</option>
                  );
                })
              }
            </select>
          </label>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ products }) => ({ products });

const mapDispatchToProps = dispatch => ({
  getCategory: category => dispatch(getCategory(category)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelect);


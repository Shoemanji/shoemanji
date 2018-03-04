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
  }

  render() {
    const { categories } = this.props;
    return (
      <Fragment>
        <form>
          <label>
            Sort by Category
          <select onChange={this.handleChange}>
            <option value={'ALL'}> -- ALL -- </option>
              {
                categories.map((category, i) => {
                  return (
                    <option key={i} value={category}>{category}</option>
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

const mapStateToProps = ({ categories }) => ({ categories });

const mapDispatchToProps = dispatch => ({
  getCategory: category => dispatch(getCategory(category)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelect);


import React from 'react';

const FilterInput = props => {

  const handleChange = props.handleChange;
  const inputValue = props.inputValue;

  return (
    <form>
      <input
        placeholder="search all products..."
        type="text"
        onChange={handleChange}
        value={inputValue}
      />
    </form>
  );
}

export default FilterInput;

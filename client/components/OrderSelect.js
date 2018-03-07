import React from 'react';
import { connect } from 'react-redux';

const OrderSelect = ({ orders, handleChange }) => {
  const statuses = orders.map(order => order.status);
  const uniqueStatuses = Array.from(new Set(statuses));
  return (
    <div className="container order-select">
      <form>
        <label>
          Sort by status
        <select onChange={handleChange}>
          <option value={'ALL'}> -- ALL -- </option>
            {
              uniqueStatuses && uniqueStatuses.map((status) => {
                return (
                  <option key={`${status}`} value={status}>{status}</option>
                );
              })
            }
          </select>
        </label>
      </form>
    </div>
  );
}

const mapStateToProps = ({ orders }) => ({ orders });

export default connect(mapStateToProps)(OrderSelect);

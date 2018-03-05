import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const OrderSelect = ({ orders, handleChange }) => {
  const statuses = orders.map(order => order.status);
  const uniqueStatuses = Array.from(new Set(statuses));
  return (
    <Fragment>
      <form>
        <label>
          Sort by Order Status
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
    </Fragment>
  );
}

const mapStateToProps = ({ orders }) => ({ orders });

export default connect(mapStateToProps)(OrderSelect);

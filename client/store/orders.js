import axios from 'axios';

const GET_ORDERS = 'GET_ORDERS';

const getOrders = orders => ({ type: GET_ORDERS, orders })

export default function reducer(orders = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    default:
      return orders;
  }
}

export const fetchOrders = id => dispatch => {
  axios.get(`/api/orders/${id}`)
  .then(res => dispatch(getOrders(res.data)))
  .catch(err => console.error(err))
}

export const fetchAllOrders = () => dispatch => {
  axios.get('/api/orders')
  .then(res => {
    dispatch(getOrders(res.data))
  })
  .catch(err => console.error(err))
}

export const updateOrder = (orderId, orderData) => dispatch => {
  axios.put(`/api/orders/${orderId}`, orderData)
  .then(res => {
    // console.log('res.data in updateOrder', res.data);
    axios.post('/api/sendmail/notify', orderData)
    .catch(err => console.error(err));
  })
  .catch(err => console.error(err));
}

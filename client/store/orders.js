import axios from 'axios'; 

const GET_ORDERS = 'GET_ORDERS'; 

const getOrders = orders => ({type: GET_ORDERS, orders})

export default function reducer (orders = [], action){
    switch (action.type){
        case GET_ORDERS:
            return action.orders;
        default:
            return orders;
    }
}

export const fetchOrders = id => dispatch => {
    axios.get(`/api/orders/${id}`)
        .then(res => dispatch(getOrders(res.data)))
}

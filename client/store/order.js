import axios from 'axios'; 

const SINGLE_ORDER = 'SINGLE_ORDER'

const getOrder = order => ({ type: SINGLE_ORDER, order })

export default function reducer(order = {}, action) {
    switch (action.type) {
        case SINGLE_ORDER:
            return action.order;
        default:
            return order;
    }
}

export const fetchOrder = id => dispatch => {
    axios.get(`/api/orders/singleOrder/${id}`)
        .then(res => dispatch(getOrder(res.data)))
}
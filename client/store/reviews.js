import axios from 'axios';

const ALL_REVIEWS = 'ALL_REVIEWS'

const getReviews = reviews => ({ type: ALL_REVIEWS, reviews })

export default function reducer(reviews = [], action) {
    switch (action.type) {
        case ALL_REVIEWS:
            return action.reviews;
        default:
            return reviews;
    }
}

export const fetchReviews = () => dispatch => {
    axios.get(`/api/reviews`)
        .then(res => dispatch(getReviews(res.data)))
}

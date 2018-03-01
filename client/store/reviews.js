import axios from 'axios';

const ALL_REVIEWS = 'ALL_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'

const getReviews = reviews => ({ type: ALL_REVIEWS, reviews })
const addReview = review => ({type: ADD_REVIEW, review})

export default function reducer(reviews = [], action) {
    switch (action.type) {
        case ALL_REVIEWS:
            return action.reviews;
        
        case ADD_REVIEW:
            return [action.review, ...reviews]

        default:
            return reviews;
    }
}

export const fetchReviews = () => dispatch => {
    axios.get(`/api/reviews`)
        .then(res => dispatch(getReviews(res.data)))
}

export const addReviews = review => dispatch => {
    axios.post('/api/reviews', review)
        .then(res => dispatch(addReview(res.data)))
}


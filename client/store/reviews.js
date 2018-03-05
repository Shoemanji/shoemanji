import axios from 'axios';

const ALL_REVIEWS = 'ALL_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'
const MY_REVIEWS = 'MY_REVIEWS'

const getReviews = reviews => ({ type: ALL_REVIEWS, reviews })
const addReview = review => ({type: ADD_REVIEW, review})
const getMyReviews = myReviews => ({type: MY_REVIEWS, myReviews})

export default function reducer(reviews = [], action) {
    switch (action.type) {
        case ALL_REVIEWS:
            return action.reviews;
        
        case ADD_REVIEW:
            return [action.review, ...reviews];
        
        case MY_REVIEWS:
            return action.myReviews;

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

export const myReviews = userId => dispatch => {
    axios.get(`/api/reviews/user/${userId}`)
        .then(res => dispatch(getMyReviews(res.data)))
}


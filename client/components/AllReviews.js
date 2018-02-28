import React from 'react';
import { connect } from 'react-redux';
import { fetchReviews } from '../store/reviews';
// import { Link } from 'react-router-dom';

class AllReviews extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchReviews();
    }

    render() {
        const filteredReviews = this.props.reviews.filter(review => review.productId === productId)
        return (
            <div>
                <ul>
                    {filteredReviews && filteredReviews.map(review =>
                        (<li key={review.id}>
                            {review.rating}
                            <br />
                            {review.text}
                            <br />
                        </li>)
                    )}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = ({ reviews }) => ({ reviews })

const mapDispatchToProps = dispatch => ({
    fetchReviews: () =>  dispatch(fetchReviews())
});
//need to add product POST request

export default connect(mapStateToProps, mapDispatchToProps)(AllReviews);

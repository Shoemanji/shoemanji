import React from 'react';
import { connect } from 'react-redux';
import { fetchReviews } from '../store';
import { Link } from 'react-router-dom';

class AllReviews extends React.Component {
    componentDidMount() {
        this.props.fetchReviews();
    }

    render() {
        const filteredReviews = this.props.reviews.filter(review => review.productId === this.props.productId)
        return (
            <div>
                <h4>Reviews</h4>
                <ul>
                    {filteredReviews && filteredReviews.map(review =>
                        (<li key={review.id}>
                            <h3><Link to={`/user/${review.userId}/reviews/`}> User : {review.userId}</Link></h3>

                            {review.rating} out of 5
                            <br />
                            {review.text}
                            <br /><br />
                        </li>)
                    )}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = ({ reviews }) => ({ reviews });

const mapDispatchToProps = dispatch => ({
    fetchReviews: () => dispatch(fetchReviews())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllReviews);

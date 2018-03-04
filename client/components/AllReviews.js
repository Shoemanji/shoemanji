import React from 'react';
import { connect } from 'react-redux';
import { fetchReviews } from '../store';

class AllReviews extends React.Component {
    constructor(props) {
        super(props)
    }

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
const mapStateToProps = ({ reviews }) => ({ reviews })

const mapDispatchToProps = dispatch => ({
    fetchReviews: () =>  dispatch(fetchReviews())
});
//need to add product POST request

export default connect(mapStateToProps, mapDispatchToProps)(AllReviews);

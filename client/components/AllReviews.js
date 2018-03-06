import React from 'react';
import { connect } from 'react-redux';
import { fetchReviews } from '../store';
import { Link } from 'react-router-dom';

class AllReviews extends React.Component {
    constructor(props) {
        super(props)
        this.renderReviews = this.renderReviews.bind(this);
    }

    componentDidMount() {
        this.props.fetchReviews();
    }

    renderReviews() {
        return this.props.filteredReviews.map(review => {
            return (
                <li key={review.id}>
                    <h3>
                        <Link to={`/user/${review.userId}/reviews/`}>{review.user.email}</Link>
                    </h3>
                    <span>{review.rating} out of 5</span>
                    <br />
                    <span>{review.text}</span>
                    <br />
                    <br />
                </li>
            )
        })
    }

    render() {
        const { filteredReviews } = this.props;
        return (
            <div>
                {filteredReviews.length ? (
                    <div>
                        {this.renderReviews()}
                    </div>
                ) : (
                    <h3>No reviews found</h3>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ reviews, product }) => {
    const filteredReviews = reviews.filter(review => {
        return review.productId === product.id;
    })
    return {
        filteredReviews,
    }
}


const mapDispatchToProps = dispatch => ({
    fetchReviews: () =>  dispatch(fetchReviews())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllReviews);

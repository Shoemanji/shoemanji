import React from 'react';
import { connect } from 'react-redux';
import { myReviews, fetchProduct } from '../store';

class MyReviews extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const userId = Number(this.props.match.params.id);
        this.props.myReviews(userId);
        this.props.singleProduct(userId);
    }
    render() {
        const { reviews } = this.props;
        return (
            reviews.length ? (
                <div>
                <ul>
                <h2>{this.props.product.title}</h2>
                {this.props.reviews.map(review =>
                    (<li key={review.id}>
                    <div>{review.text}</div>
                    </li>)
                )}
                </ul>
                </div>
            ) : (<h3>No Reviews Found</h3>)
        )
    }
}


const mapStateToProps = ({ reviews, product }) => ({ reviews, product });

const mapDispatchToProps = dispatch => ({
    myReviews: userId => dispatch(myReviews(userId)),
    singleProduct: userId => dispatch(fetchProduct(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyReviews);

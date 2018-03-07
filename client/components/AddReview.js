import React from 'react';
import { connect } from 'react-redux';
import { addReviews } from '../store/reviews';

class AddReview extends React.Component {
    constructor(props){
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit(event){
        event.preventDefault();
        const review = {
            productId: this.props.match.params.id,
            text: event.target.review.value,
            rating: Number(event.target.rating.value),
            userId: this.props.user.id
        }
        this.props.addReview(review);
        this.props.history.push(`/products/${review.productId}`);
    }

    render(){
        return (
            <div>
            <form onSubmit={this.submit}>
            review: <input required name= "review" />
                <button type="submit"> add review</button>
                <input required type="radio" name="rating" value="1" />1
                <input required type="radio" name="rating" value="2" />2
                <input required type="radio" name="rating" value="3" />3
                <input required type="radio" name="rating" value="4" />4
                <input required type="radio" name="rating" value="5" />5
            </form>
            </div>
        )
    }
}

const mapStateToProps = ({ review, user }) => ({ review, user });

const mapDispatchToProps = dispatch => ({
    addReview: review => dispatch(addReviews(review))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);


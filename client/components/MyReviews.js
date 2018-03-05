import React from 'react'; 
import { connect } from 'react-redux'; 
import { myReviews } from '../store'; 

class MyReviews extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const userId = Number(this.props.match.params.id)
        this.props.myReviews(userId)
    }
    render() {
        const { reviews } = this.props
        return (
            reviews.length ? (
                <div>
                <ul>
                {this.props.reviews.map(review =>
                    (<li key={review.id}>
                    {review.text}
                    </li>)
                )}
                </ul>
                </div>
            ) : (<h3>No Reviews Found</h3>)
        )
    }
}


const mapStateToProps = ({ reviews }) => ({ reviews })

const mapDispatchToProps = dispatch => ({
    myReviews: userId => dispatch(myReviews(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyReviews);
import React from 'react'; 
import { connect } from 'react-redux'; 
import { myReviews, fetchProducts } from '../store'; 

class MyReviews extends React.Component {
    constructor(props) {
        super(props)
        this.renderReviews = this.renderReviews.bind(this);
        this.renderProductTitle = this.renderProductTitle.bind(this);
        this.renderReviewsForProduct = this.renderReviewsForProduct.bind(this);
    }

    componentDidMount() {
        const userId = Number(this.props.match.params.id);
        this.props.myReviews(userId);
        this.props.allProducts(userId);
    }

    renderProductTitle(product) {
        return (<h3>{product.title}</h3>)
    }

    renderReviewsForProduct(product) {
        return this.props.reviews
            .filter(review => review.productId === product.id)
            .map(review => {
                return (<li key={review.id}>{review.text}</li>)
            })
    }

    renderReviews(products){
        return products.map(product => {
            return (
                <div key={product.id}>
                    <div>{this.renderProductTitle(product)}</div>
                    <ul>{this.renderReviewsForProduct(product)}</ul>
                </div>
            )
        })
    }

    render() {
        const { reviews, products } = this.props;
        return (
            reviews.length ? (
                <ul className="container">
                    {this.renderReviews(products)}
                </ul>
            ) : (
                <h3>No Reviews Found</h3>
            )
        )
    }
}


const mapStateToProps = ({ reviews, products }) => ({ reviews, products });

const mapDispatchToProps = dispatch => ({
    myReviews: userId => dispatch(myReviews(userId)),
    allProducts: userId => dispatch(fetchProducts(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyReviews);

/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Products routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const productTitle = 'tv';
    const productPrice = 500.00;
    const productCategory = 'appliance';
    const productImage = '/jordans600x393.jpg';


    beforeEach(() => {
      return Product.create({
        title: productTitle,
        price: productPrice,
        category: productCategory,
        image: productImage,
      })
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal(productTitle)
        })
    })
  }) // end describe('/api/products')
}) // end describe('Products routes')

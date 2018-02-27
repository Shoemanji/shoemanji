/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

// TODO: come up with test specs here

describe('Products model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('todo', () => {

      beforeEach(() => {
        return Product.create({
          todo1: 'xxx',
          todo2: 'xxx'
        })
          .then(user => {
            cody = user
          })
      })

    })
  })
})

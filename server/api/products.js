const productRouter = require('express').Router();
const { Product } = require('../db/models');

function isAdmin(req, res, next) {
  if (req.user.isAdmin) {
    next();
  } else {
    res.redirect('/products');
  }
}

productRouter.get('/', (req, res, next) => {
  Product.findAll()
  .then(products => res.json(products))
  .catch(next);
});

productRouter.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
  .then(id => res.json(id))
  .catch(next);
});

productRouter.post('/', (req, res, next) => {
  const { title, description, price, inventory, image, categories } = req.body;
  Product.findOrCreate({
    where: {
      title,
      description,
      price,
      inventory,
      image,
      categories,
    }
  })
  .then(product => res.json(product))
  .catch(next);
});

productRouter.put('/:id', isAdmin, (req, res, next) => {
  Product.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(([updatedProductRows, updatedProduct]) => {
    res.status(200).json(updatedProduct);
  })
  .catch(next);
});

productRouter.delete('/:id', isAdmin, (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.sendStatus(202);
  })
  .catch(next);
});

module.exports = productRouter;

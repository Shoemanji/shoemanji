const userRouter = require('express').Router();
const { User } = require('../db/models');

function isAdmin(req, res, next) {
  if (req.user.isAdmin) {
    next();
  } else {
    res.redirect('/products');
  }
}

userRouter.get('/', isAdmin, (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'isAdmin']
  })
  .then(users => res.json(users))
  .catch(next);
});

userRouter.put('/:id', (req, res, next) => {
  User.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
  .then(([updatedRows, updatedUser]) => {
    res.status(200).json(updatedUser)
  })
  .catch(next);
});

userRouter.delete('/:id', (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.sendStatus(202);
  })
  .catch(next);
});

module.exports = userRouter;

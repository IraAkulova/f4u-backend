const express = require('express');
const reviewsRouter = express.Router();

const {validateBody} = require('../decorators');
const { reviewSchema } = require('../models/review');

const {get, create} = require('../controllers/reviewes')

reviewsRouter.get('/', get);

reviewsRouter.post('/', validateBody(reviewSchema), create);

// contactsRouter.get('/', auth, get);

// contactsRouter.get('/:id', auth, isValidId, getById);

// contactsRouter.post('/', auth, validateBody(schemas.contactSchema), create);

// contactsRouter.put('/:id', auth, validateBody(schemas.contactSchema), isValidId, update);

// contactsRouter.patch('/:id/favorite', auth, isValidId, validateBody(schemas.updateFavoriteSchema), updateFavorite);

// contactsRouter.delete('/:id', auth, isValidId, remove);

module.exports = reviewsRouter;
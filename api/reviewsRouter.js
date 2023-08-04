const express = require('express');
const reviewsRouter = express.Router();

const {validateBody} = require('../decorators');
const { reviewSchema } = require('../models/review');

const {get, create} = require('../controllers/reviewes')

reviewsRouter.get('/', get);
reviewsRouter.post('/', validateBody(reviewSchema), create);

module.exports = reviewsRouter;
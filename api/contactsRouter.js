const express = require('express');
const contactRouter = express.Router();

const {validateBody} = require('../decorators');
const { contactSchema } = require('../models/contact');

const {create} = require('../controllers/contact')

contactRouter.post('/', validateBody(contactSchema), create);

module.exports = contactRouter;
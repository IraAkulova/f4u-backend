const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');
const {handleMongooseError} = require('../middlewares');

const review = new Schema(
   {
    name: {
      type: String,
      required: [true, 'Set your name'],
    },
    email: {
      type: String,
      required: [true, 'Set your email'],
    },
    phone: {
      type: String,
      required: [true, 'Set your phone'],
    },
    comment: {
      type: String,
      required: [true, 'Leave your review'],
    },
    avatarURL: {
        type: String,
        required: true,
        },
  },
  { versionKey: false, timestamps: true }
);

review.post("save", handleMongooseError);

const Review = mongoose.model("review", review);

const reviewSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().regex(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/).messages({'string.pattern.base': `Phone number must be digits and can contain spaces, dashes, parentheses and can start with +`}).required(),
  comment: Joi.string().required(),
});


module.exports = {
  Review,
  reviewSchema
};
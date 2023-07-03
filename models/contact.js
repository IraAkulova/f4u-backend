const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');
const {handleMongooseError} = require('../middlewares');

const contact = new Schema(
   {
    name: {
      type: String,
      required: [true, 'Set your name'],
    },
    phone: {
      type: String,
      required: [true, 'Set your phone'],
    },
  },
  { versionKey: false, timestamps: true }
);

contact.post("save", handleMongooseError);

const Contact = mongoose.model("contact", contact);

const contactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().regex(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/).messages({'string.pattern.base': `Phone number must be digits and can contain spaces, dashes, parentheses and can start with +`}).required(),
});


module.exports = {
  Contact,
  contactSchema
};
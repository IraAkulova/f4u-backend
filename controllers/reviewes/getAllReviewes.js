const {Review} = require('../../models/review');
const {ctrlWrapper} = require("../../decorators");

const get = async (req, res, next) => {
  const results = await Review.find()
    res.json({
      status: 'success',
      code: 200,
      data: {
        reviews: results,
      },
    }) 
}

module.exports = {
  get: ctrlWrapper(get),
}
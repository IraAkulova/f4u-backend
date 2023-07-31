const {Review} = require('../../models/review');
const {ctrlWrapper} = require("../../decorators");

const get = async (req, res, next) => {
  const { page = 1, limit = 3 } = req.params;
  const skip = (page - 1) * limit;
  const results = await Review.find().limit(limit)
    .skip(skip)
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
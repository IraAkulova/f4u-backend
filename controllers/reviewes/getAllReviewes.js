const {Review} = require('../../models/review');
const {ctrlWrapper} = require("../../decorators");

const get = async (req, res, next) => {
  const { page = 1, limit = 3} = req.query;
  console.log(req)
  const skip = (page - 1) * limit;
  const results = await Review.find({}, '-createdAt -updatedAt', {skip, limit})
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
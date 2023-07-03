const { Review } = require('../../models/review');
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const create = async (req, res, next) => {
    const { name, email, phone, comment } = req.body;

    const { error } = req.body;
    if (error) {
        throw HttpError(400, `Missing required name field`)
    }
    const result = await Review.create({ name, email, phone, comment })
    res.status(201).json({
        status: 'success',
        code: 201,
        data: { review: result },
    })
}

module.exports = {
    create: ctrlWrapper(create)
}
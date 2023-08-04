const { Review } = require('../../models/review');
const { HttpError, sendEmail } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");
const gravatar = require('gravatar');
const { AvatarGenerator } = require('random-avatar-generator');

// const EMAIL = 'bikeoffer90@gmail.com';
const generator = new AvatarGenerator();

const create = async (req, res, next) => {
    const { name, email, phone, comment } = req.body;
    const { error } = req.body;
    if (error) {
        throw HttpError(400, `Missing required name field`)
    }
    const avatarURL = generator.generateRandomAvatar();
    const newReview = await Review.create({ ...req.body, avatarURL});

    const addedComment = {
        to: 'ira.akulova2019@gmail.com',
        subject: 'User left a review',
        html: `<p>${name} left a review: "${comment}". You can contact him by email ${email} or call ${phone}</p>`
    };

    await sendEmail(addedComment);
    res.status(201).json({
        status: 'success',
        code: 201,
        data: { review: newReview },
    })
}

module.exports = {
    create: ctrlWrapper(create)
}
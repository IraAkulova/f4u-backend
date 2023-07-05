const { Contact } = require('../../models/contact');
const { HttpError, sendEmail } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const create = async (req, res, next) => {
    const { name, phone } = req.body;

    const { error } = req.body;
    if (error) {
        throw HttpError(400, `Missing required name field`)
    }
    const result = await Contact.create({ name, phone })
    const addedContact = {
        to: 'bikeoffer90@gmail.com',
        subject: 'User asks for call back',
        html: `<p>${name} lasks for call back. You can contact him by ${phone}</p>`
    };

    await sendEmail(addedContact);
    res.status(201).json({
        status: 'success',
        code: 201,
        data: { review: result },
    })
}

module.exports = {
    create: ctrlWrapper(create)
}
const express = require("express");
const router = express.Router();
const bookingController = require('../controllers/Booking');
const validator = require('../utils/validator')
const dateHelp = require("../utils/date")
const {isAuth, isAdmin} = require('../middlewares/auth')

router.post('/', isAuth, async (req, res) => {
    const userId = req.user.id;

    let { received_date, expiration_date, bookId } = req.body;

    received_date = dateHelp(received_date);
    expiration_date = dateHelp(expiration_date);

    const createBooking = await bookingController.create({received_date, expiration_date, bookId}, userId);
    return res.status(200).send({ success: true, data: createBooking });
})

.get('/', isAuth, isAdmin, async (req, res) => {
    const getAllBooking = await bookingController.getAll();
    return res.status(200).send({ success: true, data: getAllBooking });
})

module.exports = router;
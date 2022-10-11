const express = require("express");
const router = express.Router();
const bookingController = require('../controllers/Booking');
const validator = require('../utils/validator')
const dateHelp = require("../utils/date")
const { isAdmin, isNotUser} = require('../middlewares/auth');
const { prisma } = require("@prisma/client");
const { booking } = require("../prisma");

router.post('/:bookId', async (req, res) => {
    const userId = req.user.id;

    let { received_date } = req.body;

    const {bookId} = req.params;

    received_date = new Date(received_date);

    let date = new Date(received_date);

    let expiration_date = date.setDate(date.getDate() + 15);

    expiration_date = dateHelp(expiration_date);

    let currentDate = new Date();

    if(currentDate.getTime()>=received_date.getTime()){
        return res.status(500).send({ success: false, data: "Received date is small"});
    }
    const createBooking = await bookingController.create({received_date, expiration_date, bookId}, userId);
    return res.status(200).send({ success: true, data: createBooking });    
})

.get('/', isAdmin, async (req, res) => {
    try{
    const getAllBooking = await bookingController.getAll();
    return res.status(200).send({ success: true, data: getAllBooking });
    }catch(err) {
        console.log(err)
        return res.status(500).send({ success: false, data: err?.message || err});
    }
})

.post('/extend/:bookingId', async( req, res) => {
    const { bookingId } = req.params;
    const isExtendBooking = await bookingController.extend(bookingId);
    return res.status(200).send({success: true, data: isExtendBooking});
})

.get('/extends/',isNotUser, async(req,res) => {
    const getAllExtendBooking = await bookingController.getExtendsList();
    return res.status(200).send({success: true, data: getAllExtendBooking});
})

.post('/approve/:bookingId',isNotUser, async (req, res) => {
    try{
    const { bookingId } = req.params;
    const isApproveExtend = await bookingController.approveExtend(bookingId)
    return res.status(200).send({success: true, data: isApproveExtend})
    }catch(err){
        console.log(err)
        return res.status(500).send({ success: false, data: err?.message || err});
    }
})

// model Booking {
//     id               BigInt   @id @default(autoincrement())
//     received_date    DateTime
//     expiration_date  DateTime
//     return_date      DateTime?
//     userId           BigInt
//     bookId           BigInt
//     isExtend         Boolean  @default(false)
//     isExtendApproved Boolean  @default(false)
//     Book             Book     @relation(fields: [bookId], references: [id], onDelete: NoAction)
//     User             User     @relation(fields: [userId], references: [id], onDelete: NoAction)
//   }
module.exports = router;
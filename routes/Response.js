const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book")
const responseController = require('../controllers/response');
const validator = require('../utils/validator');
const { isAuth, isAdmin } = require('../middlewares/auth');

router.post('/:bookId', isAuth, async (req, res) => {
    try{
    const { bookId } = req.params;
    const  userId  = req.user.id;

    const createResponse = await responseController.create({bookId, userId})
    return res.status(200).send({ success: true, data: createResponse });
    }catch(err){
        console.log(err)
        return res.status(500).send({ success: false, data: err?.message || err});
    }




})


module.exports = router;

// model Response {
//     id     BigInt @id @default(autoincrement())
//     bookId BigInt
//     userId BigInt
//     Book   Book   @relation(fields: [bookId], references: [id], onDelete: NoAction)
//     User   User   @relation(fields: [userId], references: [id], onDelete: NoAction)
//   }
const express = require("express");

const router = express.Router();
const anketaController = require('../controllers/anketa');
const validator = require('../utils/validator')
const dateHelp = require("../utils/date")
const {isAuth, isAdmin} = require('../middlewares/auth')

router.post('/', isAuth,  async (req, res) => {
    const  userId  = req.user.id;

    let { birthDay, address, education, specialty,workStudy } = req.body;
    birthDay = dateHelp(birthDay);

    const { msg, success} = validator.isString({address, education, specialty,workStudy});
    if(!success) return res.status(400).send({ success: false, data: msg});

    const createAnketa = await anketaController.create({birthDay, address, education, specialty,workStudy}, userId)
    return res.status(200).send({ success: true, data: createAnketa });
})
module.exports = router;

// id        BigInt   @id @default(autoincrement())
// birthDay  DateTime
// address   String   @db.VarChar(255)
// education String   @db.VarChar(255)
// specialty String   @db.VarChar(255)
// workStudy String   @db.VarChar(255)
// User      User[]
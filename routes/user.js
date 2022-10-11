const express = require("express");

const router = express.Router();
const userController = require('../controllers/user');
const validator = require('../utils/validator')
const auth = require('../middlewares/auth')
const { isAuth, isAdmin, ModerOrAdmin, isOperator, isModer, isNotUser } = require("../middlewares/auth")
const upload = require("../middlewares/upload");
const { prisma } = require("@prisma/client");
const TMClient = require('textmagic-rest-client');
const sms = require("../utils/sms")

router.post('/registration', upload.single('avatar') ,async (req, res) => {
    const { phoneNumber, firstName, lastName,fatherName, password, IIN } = req.body;
    const { file } = req;
    const { msg, success} = validator.isString({firstName, lastName, fatherName, password, IIN, phoneNumber});
    if(!success) return res.status(400).send({ success: false, data: msg});

    const createUser = await userController.registration({phoneNumber, firstName, avatar: file.path, lastName,fatherName, password, IIN})
    return res.status(200).send({ success: true, data: createUser });
})

.post('/login', async (req, res) => {
    const { phoneNumber, password } = req.body;
    const genre = await userController.login({phoneNumber,password})
    return res.status(200).send({ success: true, data: genre });
})

.post('/registration/moderator',isAuth, isAdmin, async (req, res) => {
    try{
    const { phoneNumber, firstName, lastName, fatherName, avatar, password, IIN } = req.body;
    const { msg, success } = validator.isString({ phoneNumber, firstName, lastName, fatherName, avatar, password, IIN });
    if(!success) return res.status(400).send({ success: false, data: msg });

    const createdModer = await userController.registration({ phoneNumber, firstName, lastName, fatherName, avatar, password, IIN , role: 'MODERATOR' })
    return res.status(200).send({success: true, data: createdModer});
    }catch(err){
        console.log(err)
        return res.status(500).send({ success: false, data: err.message});
    }
})



.post('/registration/operator',isAuth,ModerOrAdmin, async (req, res) => {
    try{
    const { phoneNumber, firstName, lastName, fatherName, avatar, password, IIN } = req.body;
    const { msg, success } = validator.isString({ phoneNumber, firstName, lastName, fatherName, avatar, password, IIN });
    if(!success) return res.status(400).send({ success: false, data: msg });

    const createdModer = await userController.registration({ phoneNumber, firstName, lastName, fatherName, avatar, password, IIN , role: 'OPERATOR' })
    return res.status(200).send({success: true, data: createdModer});
    }catch(err){
        console.log(err)
        return res.status(500).send({ success: false, data: err.message});
    }
})

.post('/find', isAuth, isNotUser, async (req, res) => {
    const { firstName, lastName, IIN } = req.body;
    const { msg, success } = validator.isString({ firstName, lastName, IIN });
    if(!success) return res.status(400).send({ success: false, data: msg });

    const findUser = await userController.findUser({firstName, lastName, IIN});
    return res.status(200).send({ success: true, data: findUser });
})


module.exports = router;
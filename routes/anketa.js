const express = require("express");

const router = express.Router();
const anketaController = require('../controllers/anketa');
const validator = require('../utils/validator')
const dateHelp = require("../utils/date")
const {isAuth, isAdmin, isNotUser} = require('../middlewares/auth')

router.post('/', isAuth,  async (req, res) => {
    const  userId  = req.user.id;

    let { birthDay, address, education, specialty,workStudy } = req.body;
    birthDay = dateHelp(birthDay);

    const { msg, success} = validator.isString({address, education, specialty,workStudy});
    if(!success) return res.status(400).send({ success: false, data: msg});

    const createAnketa = await anketaController.create({birthDay, address, education, specialty,workStudy}, userId)
    return res.status(200).send({ success: true, data: createAnketa });
})

.get("/anketa", async (req,res) => {
    try{

      const userId = req.user.id;
      
      const getOneAnketa = await anketaController.getOne(userId)
      return res.status(200).send({success: true, data: getOneAnketa});

    }catch(err){
        console.log(err);
        return res.status(500).send({success: false,data: err?.message || err})
    }
})

.get("/getAll/",isNotUser, async (req,res)=> {
    try{
        const getAllAnketa = await anketaController.getAll()
        return res.status(200).send({success: true, data: getAllAnketa})
    }catch(err){
        console.log(err);
        return res.status(500).send({success: false, data: err?.message || err});
    }
})

.put('/:anketaId', async (req,res) => {
    try {
        const userId = req.user.id;
        const { anketaId } = req.params;
        let { birthDay, address, education, specialty, workStudy } = req.body;
        birthDay = dateHelp(birthDay);
        const {msg, success} = validator.isString({address,education,specialty,workStudy});
        if(!success) return res.status(400).send({success: false, data: msg});

        const updateAnketa = await anketaController.update({birthDay, address, education, specialty,workStudy,anketaId},userId);
        return res.status(200).send({success: true, data: updateAnketa});
    }catch(err){
        console.log(err);
        return res.status(500).send({success: false, data: err?.message || err});
    }
})
//     СТОИТ ЛИ ДОБАВЛЯТЬ УДАЛЕНИЕ АНКЕТЫ?
.delete("/:anketaId", async (req,res) => {
    try {
        const { anketaId } = req.params;
        const userId = req.user.id;
    }catch(err) {
        console.log(err);
        return res.status(500).send({success: false, data: err?.message || err});
    }
})
module.exports = router;

// id        BigInt   @id @default(autoincrement())
// birthDay  DateTime
// address   String   @db.VarChar(255)
// education String   @db.VarChar(255)
// specialty String   @db.VarChar(255)
// workStudy String   @db.VarChar(255)
// User      User[]
// const express = require("express");

// const router = express.Router();
// const genreController = require('../controllers/genre');
// const validator = require('../utils/validator')
// const {isAuth, isAdmin} = require('../middlewares/auth')

// router.post('/', isAuth,  async (req, res) => {
//     const {  } = req.body;
//     const { msg, success} = validator.isString({name});
//     if(!success) return res.status(400).send({ success: false, data: msg});

//     const cretedGenre = await genreController.create({name})
//     return res.status(200).send({ success: true, data: cretedGenre });
// })
module.exports = router;
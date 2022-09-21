const express = require("express");
const router = express.Router();
const genreController = require('../controllers/genre');
const validator = require('../utils/validator')
const {isAuth, isAdmin} = require('../middlewares/auth')

router.post('/', isAuth, isAdmin,  async (req, res) => {
    const { name } = req.body;
    const { msg, success} = validator.isString({name});
    if(!success) return res.status(400).send({ success: false, data: msg});

    const cretedGenre = await genreController.create({name})
    return res.status(200).send({ success: true, data: cretedGenre });
})

.get('/', async (req, res) => {
    const genre = await genreController.getAll()
    return res.status(200).send({ success: true, data: genre });
})

.put('/:id', isAuth, isAdmin,async (req, res) => {
    const { name } = {...req.body, ...req.query};
    const { msg, success} = validator.isString({name});
    const { id } = req.params;
    if(!success) return res.status(400).send({success: false, data: msg});

    const updatedGenre = await genreController.update({id,name})
    return res.status(200).send({success: true, data: updatedGenre});
})

.delete('/:id', isAuth, async (req, res) => {
    const { id } = req.params;

    const deletedGenre = await genreController.delete({id})
    return res.status(200).send({success: true, data: deletedGenre});
})


module.exports = router;
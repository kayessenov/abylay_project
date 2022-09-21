const express = require("express");
const router = express.Router();
const BookController = require('../controllers/book');
const validator = require('../utils/validator')
const { isAuth, isAdmin } = require('../middlewares/auth')
const dateHelp = require("../utils/date")

router.post("/", isAuth, isAdmin, async(req, res) => {
    const { title,author,isbn,description,count,rating,price,publishing_dat,topic,genreIds } = req.body;
    console.log(typeof publishing_dat, publishing_dat);
    publishing_date = new Date(publishing_dat);
    
    console.log(typeof publishing_date, publishing_date)
    const { msg, success} = validator.isString({title,author,isbn,description,topic});
    if(!success) return res.status(400).send({ success: false, data: msg});

    const createBook = await BookController.create(
        {title,
        author,
        isbn,
        description,
        count,
        rating,
        price,
        publishing_date,
        topic},
        genreIds)
    return res.status(200).send({ success: true, data: createBook });
})

.get("/:id",async(req,res) => {
    const { id } = req.params;
    const getOneBook = await BookController.getOne({id})
    return res.status(200).send({success: true, data: getOneBook});
})

.get("/", async (req, res) => {
    const getAllBooks = await BookController.getAll();
    return res.status(200).send({success: true, data: getAllBooks});
})

.put("/:id", isAuth, isAdmin, async (req,res) => {
    const { id } = req.params;
    const { title, author, isbn, price, description, count, rating, publishing_dat, topic, genreIds} = req.body;

    publishing_date = new Date(publishing_dat);

    const { msg, success} = validator.isString({title,author,isbn,description,topic});
    if(!success) return res.status(400).send({ success: false, data: msg});

    const updateBook = await BookController.update(
        {
            id,
            title,
        author,
        isbn,
        description,
        count,
        rating,
        price,
        publishing_date,
        topic},
        genreIds)

        return res.status(200).send({success: true, data: updateBook});
})
module.exports = router;
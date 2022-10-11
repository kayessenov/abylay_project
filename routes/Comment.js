const express = require("express")
const router = express.Router()
const commentController = require("../controllers/comment")
const validator = require("../utils/validator")
const { isAuth, isAdmin, isNotUser } = require("../middlewares/auth")

router.post('/:newsId',isAuth, async(req, res) => {
    try{
    const userId = req.user.id;
    const { newsId } = req.params
    const { message } = {...req.body,...req.query}
    const currentTime = new Date();

    const { msg, success} = validator.isString({message});
    if(!success) return res.status(400).send({success: false, data: msg});

    const createComment = await commentController.create({message, currentTime},userId,newsId)
    return res.status(200).send({success: true, data: createComment})
    }catch(err){
        console.log(err)
        return res.status(500).send({ success: false, data: err?.message || err});
    }
})

.put('/:newsId',isAuth, async(req,res) => {
    try{
    const userId = req.user.id;
    const { newsId } = req.params;
    const { message,commentId } = {...req.body,...req.query};

    const { msg, success } = validator.isString({message});
    if(!success) return res.status(400).send({ success: false, data: msg });

    const updateComment = await commentController.update({message,commentId,userId,newsId});
    return res.status(200).send({success: true, data: updateComment});
    }catch(err){
        console.log(err)
        return res.status(500).send({ success: false, data: err?.message || err});
    }
})

.delete("/:newsId",isAuth, async (req,res) => {
    try{
        const userId = req.user.id;
        const { newsId } =req.params;
        const { commentId } = {...req.body};

        const deleteComment = await commentController.delete({userId, newsId, commentId});
        return res.status(200).send({success: true, data: deleteComment});
    }catch(err){
        console.log(err)
        return res.status(500).send({ success: false, data: err?.message || err});
    }
})

.get("/:newsId", async (req,res) => {
    try {
        const { newsId } = req.params;
        const getAllCommentsForNews = await commentController.getAll(newsId)
        return res.status(200).send({success: true, data: getAllCommentsForNews})
    }catch(err) {
        console.log(err)
        return res.status(500).send({ success: false, data: err?.message || err});
    }
})

.get("/getAll/:newsId", async (req,res) => {
    try{
        const { newsId } = req.params;
        const getAllComentsForNews = await commentController.getAll(newsId); 
        return res.status(200).send({success: true, data: getAllComentsForNews})
    }catch(err){
        console.log(err);
        return res.status(500).send({success: true, data: err?.message || err});
    }
})


module.exports = router;
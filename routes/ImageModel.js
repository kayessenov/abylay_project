const express = require("express")
const router = express.Router();
const { isAdmin, isModer, isAuth, isNotUser } = require("../middlewares/auth")
const upload = require ("../middlewares/upload")
const ImageModelController = require("../controllers/imageModel")

router.post("/", isAuth, isNotUser, async (req, res) => {
    const { link } = req;
    
} )

// model ImageModel {
//     id     BigInt @id @default(autoincrement())
//     link   String
//     bookId BigInt?
//     newsId BigInt?
//     Book   Book?   @relation(fields: [bookId], references: [id], onDelete: NoAction)
//     News   News?   @relation(fields: [newsId], references: [id], onDelete: NoAction)
//   }

module.exports = router;
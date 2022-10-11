const prisma = require("../../prisma")
const methods = {
    update: null,
    delete: null,
    create: null,
    getAll: null,
}

methods.create = async function(commentData, userId, newsId){
    const commentCreate = await prisma.comment.create({
        data: {
            ...commentData,
            News: {
                create: newsId,
            },
            User: {
                create: userId
            }
        },
        include:{
            News: true,
            User: true
        }
    });
    
    return commentCreate;
}

methods.update = async function(data){
}

methods.delete = async function(data){
    const isExist = await prisma.comment.findUnique({
        where: {
            id: BigInt(data.id)
        }
    });

    if(!isExist) return "Comment already does not exist"

    const deleteComment = await prisma.comment.delete({
        where: {
            id: BigInt(data.id)
        }
    })
    return deleteComment;
}

methods.getAll = async function(data){
    const getAllComment = await prisma.comment.findMany()
    return getAllComment;
}

module.exports = methods;

// model Comment {
//     id      BigInt @id @default(autoincrement())
//     message String
//     userId  BigInt
//     newsId  BigInt
//     User    User   @relation(fields: [userId], references: [id], onDelete: NoAction)
//     News    News   @relation(fields: [newsId], references: [id], onDelete: NoAction)
//   }
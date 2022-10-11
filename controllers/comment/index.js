const prisma = require("../../prisma")
const dateHelp = require('../../utils/date')
const methods = {
    update: null,
    delete: null,
    create: null,
    getAll: null,
}

methods.create = async function(commentData, userId, newsId){
    const isExist = await prisma.news.findUnique({
        where: {
            id: BigInt(newsId)
        }
    })

    if(!isExist) return "News is not found"

    const commentCreate = await prisma.comment.create({
        data: {
            message: commentData.message,
            created_at: commentData.currentTime,
            News: {
                connect: {
                    id: BigInt(newsId)
                }
            },
            User: {
                connect: {
                    id: BigInt(userId)
                }
            }
        },
        include:{
            News: true,
            User: true
        }
    });
    
    return commentCreate;
}

methods.update = async function(commentData){
    const isExist = await prisma.comment.findUnique({
        where: {
            id: BigInt(commentData.commentId),
        }
    })
    if(!isExist) throw new Error("Comment is not found")

    let date = new Date(isExist.created_at);

    let time2 = new Date(date.setDate(date.getDate()+2))
    

    let newDate = new Date();
    let update_at = new Date();

    if(isExist.userId==commentData.userId) {

        if(time2.getTime() > newDate.getTime() ) {
            const updateComment = await prisma.comment.update({
                where: {
                    id: BigInt(commentData.commentId),
                },
                data: {
                    message: commentData.message,
                    update_at: update_at,
                    created_at: isExist.created_at
                },
                include: {
                    News: true,
                    User: true
                }
            })
            return updateComment;
        }else{
            throw new Error("Time for change has expired")
        }
    }
    throw new Error("You are not the author of this comment")   
    
}

methods.delete = async function(data){
    const isExist = await prisma.comment.findUnique({
        where: {
            id: BigInt(data.commentId)
        }
    });

    if(!isExist) return "Comment is not found"

    if(isExist.userId==data.userId){

        const deleteComment = await prisma.comment.delete({
            where: {
                id: BigInt(data.commentId)
            }
        })
        return deleteComment;
    }throw new Error("You are not the author of this comment")
}

methods.getAll = async function(newsId){
    const getAllComment = await prisma.comment.findMany({
        where: {
            newsId: BigInt(newsId)
        }
    })
    return getAllComment;
}

module.exports = methods;

// model Comment {
//     id      BigInt @id @default(autoincrement())
//     message String
//     userId  BigInt
//     newsId  BigInt
//     created_at  DateTime
//     update_at   DateTime?
//     User    User   @relation(fields: [userId], references: [id], onDelete: NoAction)
//     News    News   @relation(fields: [newsId], references: [id], onDelete: NoAction)
//   }
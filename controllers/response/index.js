const prisma = require("../../prisma")
const { get } = require("../../routes/user")
const methods = {
    create: null,
    delete: null,
    getOne: null,
    getAll: null,
}

methods.delete = async function(data){
    const isExist = await prisma.response.findUnique({
        where: {
            id: BigInt(data.id)
        },
        include: {
            Book: true,
            User: true
        }
    });

    if(!isExist) throw new Error("Response is not found");

    const deleteResponse = await prisma.response.delete({
        where: {
            id: BigInt(data.id)
        },
        include: {
            Book: true,
            User: true
        }
    });

    return deleteResponse;
}

methods.create = async function({userId, bookId}){
    const findResponse = await prisma.response.findFirst({
        where: {
            userId: BigInt(userId),
            bookId: BigInt(bookId)
        }
    })

    if(findResponse) throw new Error("Уже существует")

    const createResponse = await prisma.response.create({
        data: {
            User: {
                connect:  { id: BigInt(userId) } 
            },
            Book: {
                connect:  { id: BigInt(bookId) } 
            }
        },
        include: {
            User: true,
            Book: true
        }
    });

    return createResponse;

}

methods.getAll = async function(userId){
    const getAllResponse = await prisma.response.findMany({
        where: {
            userId: BigInt(userId)
        },
        include: {
            User: true,
            Book: true
        }
    })
    return getAllResponse;
}

methods.getOne = async function(userId, responseId){
    const isExist = await prisma.response.findFirst({
        where: {
            id: BigInt(responseId),
            userId: BigInt(userId)
        },
        include: {
            User: true,
            Book: true
        }
    });
    if(!isExist) throw new Error("Response is not found")

    return isExist;
}

module.exports = methods;

// model Response {
//     id     BigInt @id @default(autoincrement())
//     bookId BigInt
//     userId BigInt
//     Book   Book   @relation(fields: [bookId], references: [id], onDelete: NoAction)
//     User   User   @relation(fields: [userId], references: [id], onDelete: NoAction)
//   }
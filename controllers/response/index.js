const prisma = require("../../prisma")
const methods = {
    update: null,
    create: null,
    delete: null,
    getOne: null,
    getAll: null,
}

methods.update = async function(data){

}

methods.delete = async function(data){

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

methods.getAll = async function(data){

}

methods.getOne = async function(data){

}

module.exports = methods;

// model Response {
//     id     BigInt @id @default(autoincrement())
//     bookId BigInt
//     userId BigInt
//     Book   Book   @relation(fields: [bookId], references: [id], onDelete: NoAction)
//     User   User   @relation(fields: [userId], references: [id], onDelete: NoAction)
//   }
const { prisma } = require("@prisma/client")
const prism = require("../../prisma")
const methods = {
    update: null,
    delete: null,
    getOne: null,
    getAll: null,
    create: null,
}

methods.create = async function(data) {
    const imageModel = await prisma.imageModel.create({data})
}

methods.update = async function(data){

}

methods.delete = async function(data) {

}

methods.getAll = async function(data){

}

methods.getOne = async function(data){

}

module.exports = methods;

// model ImageModel {
//     id     BigInt @id @default(autoincrement())
//     link   String
//     bookId BigInt?
//     newsId BigInt?
//     Book   Book?   @relation(fields: [bookId], references: [id], onDelete: NoAction)
//     News   News?   @relation(fields: [newsId], references: [id], onDelete: NoAction)
//   }
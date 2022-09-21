const prisma = require("../../prisma")
const methods = {
    create: null,
    getOne: null,
    getAll: null,
    update: null,
    delete: null,
}

methods.create = async function(bookData, genreIds){
    genreIds = genreIds.map(id => ({genreId: id}) )
    const book = await prisma.book.create({
        data: {
            ...bookData,
            BookGenre: {
                create: genreIds
            }
        },
        include: {
            BookGenre: true
        }
    })
    return book;
}

methods.update = async function(bookData, genreIds) {
    genreIds = genreIds.map(id => ({genreId: id}) )

    const isExist = await prisma.book.findUnique({
        where: {
            id: BigInt(bookData.id)
        }
    })

    if(!isExist) return "Book already does not exist"

    const book = await prisma.book.update({
        where: {
            id: BigInt(bookData.id),
          },
        data:{
            title: bookData.title,
            author: bookData.author,
            isbn: bookData.isbn,
            description: bookData.description,
            price: bookData.price,
            rating: bookData.rating,
            count: bookData.count,
            topic: bookData.topic,
            publishing_date: bookData.publishing_date,
            BookGenre: {
                create: genreIds
            }
        },
        include: {
            BookGenre: true
        }
    })
    return book;
}

methods.getAll = async function(data) {
    const getAllBook = await prisma.book.findMany({
        include: {
            BookGenre: true
        }
    });
    return getAllBook;
}

methods.getOne = async function(data) {
    const isExist = await prisma.book.findUnique({
        where: {
            id: BigInt(data.id)
        },
        include: {
            BookGenre:true
        }
    })
    if(!isExist) return "Book already does not exist";

    return isExist;

    // const getBook = await prisma.book.findUnique({
    //     where: {
    //         id: BigInt(data.id)
    //     }
    // })
    // return getBook;
}

methods.delete = async function(data){
    const isExist = await prisma.book.findUnique({
        where: {
            id: BigInt(data.id)
        }
    })

    if(!isExist) return "Book already does not exist"

    const deleteBook = await prisma.book.delete({
        where: {
            id: BigInt(data.id)
        },
        include: {
            BookGenre: true
        }
    })

    return deleteBook;
}

module.exports = methods;
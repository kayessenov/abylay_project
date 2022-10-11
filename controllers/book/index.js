const prisma = require("../../prisma")
const methods = {
    create: null,
    getOne: null,
    getAll: null,
    update: null,
    delete: null,
}

methods.create = async function(bookData, genreIds){
    const { title,
        author,
        isbn,
        description,
        count,
        rating,
        price,
        publishing_date,
        topic} = bookData;
        genreIds = genreIds.map(id => ({genreId: id}) )
    const book = await prisma.book.create({
        data: {
            title,
        author,
        isbn,
        description,
        count,
        rating,
        price,
        publishing_date,
        topic,
            BookGenre: {
                create: genre
            }
        },
        include: {
            BookGenre: true
        }
    })

    let data = bookData.files.map(file => ({link: file.path, bookId: book.id}));
    const resukt = await prisma.imageModel.createMany({
        data
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
}

methods.delete = async function(id){
    const isExist = await prisma.book.findUnique({
        where: {
            id: BigInt(id)
        }
    })

    if(!isExist) return "Book is not found"

    const deleteBook = await prisma.book.delete({
        where: {
            id: BigInt(id)
        },
        include: {
            BookGenre: true
        }
    })

    return deleteBook;
}

module.exports = methods;
const prisma = require("../../prisma")
const methods = {
    update: null,
    create: null,
    delete: null,
    getOne: null,
    getAll: null,
};

methods.update = async function(data) {
    const isExist = await prisma.news.findUnique({
        where: {
            id: BigInt(data.id)
        }
    })

    if(!isExist) return "News already does not exist"

    const updateNews = await prisma.news.update({
        where: {
            id: BigInt(data.id)
        },
        data: {
            title: data.title,
            short_title: data.short_title,
            description: data.description,
            update_at: data.update_at
        }
    })

    return updateNews;
};

methods.delete = async function(data) {
    const isExist = await prisma.news.findUnique({
        where:{
            id: BigInt(data.id)
        }
    })
    if(!isExist) return "News already does not exist"

    const deleteNews = await prisma.news.delete({
        where: {
            id: BigInt(data.id)
        }
    })

    return deleteNews;
};

methods.getOne = async function(data) {
    const isExist = await prisma.news.findUnique({
        where: {
            id: BigInt(data.id)
        }
    });

    if(!isExist) return "News already does not exist"

    return isExist;
};

methods.getAll = async function(data) {
    const getAllNews = await prisma.news.findMany();

    return getAllNews;
}

methods.create = async function(data) {
    const createNews = await prisma.news.create({
        title, 
        short_title, 
        description, 
        created_at});

    return createNews
}

module.exports = methods;
const prisma = require("../../prisma")
const methods = {
    update: null,
    create: null,
    delete: null,
    getOne: null,
    getAll: null,
};

methods.update = async function(news) {
    // ОШИБКА
    const { id,title, 
        short_title, 
        description, 
        update_at} = news;

    const isExist = await prisma.news.findUnique({
        where: {
            id: BigInt(id)
        }
    })

    if(!isExist) throw new Error("News already does not exist")

    const updateNews = await prisma.news.update({
        where: {
            id: BigInt(id)
        },  
        data: {
            title: title,
            short_title: short_title,
            description: description,
            update_at: update_at
        }
    })
    const isImageExist = await prisma.imageModel.findMany({
        where: {
            newsId: BigInt(id)
        }
    })
    if(!isImageExist) {
        let data = news.files.map(file => ({link: file.path, newsId: createNews.id}));
    const resukt = await prisma.imageModel.createMany({
        data
    })
    return updateNews
    }else{

        let data = news.files.map(file => ({link: file.path, newsId: id}));
        const result = await prisma.imageModel.updateMany({
            where:{
                newsId: BigInt(id)
            },
            data
        })

        return updateNews;
    }
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

methods.getOne = async function(newsId) {
    const isExist = await prisma.news.findUnique({
        where: {
            id: BigInt(newsId)
        }
    });

    if(!isExist) return "News already does not exist"

    return isExist;
};

methods.getAll = async function(data) {
    const getAllNews = await prisma.news.findMany();

    return getAllNews;
}

methods.create = async function(news) {
    const { title, 
        short_title, 
        description, 
        created_at} = news;
    const createNews = await prisma.news.create({
        data: {
            title, 
            short_title, 
            description, 
            created_at
        }});

    
   let data = news.files.map(file => ({link: file.path, newsId: createNews.id}));
    const resukt = await prisma.imageModel.createMany({
        data
    })
    return createNews
}

module.exports = methods;
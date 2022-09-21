const prisma = require("../../prisma")
const methods = {
    create: null,
    getOne: null,
    getAll: null,
    update: null,
    delete: null,
}

methods.create = async function(anketaCreate, userId) {
    const isExist = await prisma.User.findUnique({
        where: {
            id: BigInt(userId)
        }
    })
    if(!isExist) return 'User already does not exist'

    const createAnketa = await prisma.anketa.create({
        data: {
            ...anketaCreate,
            User: {
                create: userId
            }
        },
        include: {
            User: true
        }
    })
    return createAnketa;
}

methods.update = async function(anketaUpdate, userId) {
    const isExist = await prisma.User.findUnique({
        where: {
            id: BigInt(userId)
        }
    })
    if(!isExist) return 'User already does not exist'

    const updateAnketa = await prisma.anketa.update({anketaUpdate,
    include: {
        User: true
    }})
    return createAnketa;
}

methods.getAll = async function(anketaGetAll) {
    const getAllAnketa = await prisma.anketa.findMany();
    return getAllAnketa;
}

methods.getOne = async function(data) {
    const isExist = await prisma.anketa.findUnique({
        where: {
            id: BigInt(data.id)
        },
        include: {
            User: true
        } 
    });

    if(!isExist) return 'Anketa already does not exist';

    return isExist;
}

methods.delete = async function(data){
    const isExist = await prisma.anketa.findUnique({
        where: {
            id: BigInt(data.id)
        }
    });
    if(!isExist) return 'Anketa already does not exist';

    const deleteAnketa = await prisma.anketa.delete({
        where: {
            id: BigInt(data.id)
        },
        include: {
            User: true
        }
    });

    return deleteAnketa;
}

module.exports = methods;

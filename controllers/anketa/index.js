const prisma = require("../../prisma")
const methods = {
    create: null,
    getOne: null,
    getAll: null,
    update: null,
    delete: null,
}

methods.create = async function(anketaCreate, userId) {
    const createAnketa = await prisma.anketa.create({
        data: {
            ...anketaCreate
        }
    })

    const updateUser = await prisma.User.update({
        where: {
            id: BigInt(userId)
        },
        data: {
            Anketa: {
                connect: {id: BigInt(createAnketa.id)}
            }
            
        },
        include: {
            Anketa: true
        }
    })
    return createAnketa;
//   id        BigInt   @id @default(autoincrement())
//   birthDay  DateTime
//   address   String   @db.VarChar(255)
//   education String   @db.VarChar(255)
//   specialty String   @db.VarChar(255)
//   workStudy String   @db.VarChar(255)
//   User      User[]
    
}

methods.update = async function(anketaUpdate, {userId}) {
    const updateAnketa = await prisma.anketa.update({anketaUpdate,
    include: {
        User: true
    }})
    return updateAnketa;
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

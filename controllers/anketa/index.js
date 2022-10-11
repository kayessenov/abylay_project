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
    
}

methods.update = async function(anketaUpdate, userId) {
    const isExist = await prisma.user.findUnique({
        where: {
            id: BigInt(userId)
        },
        include: {
            Anketa: true
        }
    })
    if(!isExist) throw new Error("User is not found")

    if(isExist.anketaId==anketaUpdate.anketaId){
        const updateAnketa = await prisma.anketa.update({
            where: {
                id: BigInt(anketaUpdate.anketaId)
            },
            data:{
                birthDay:anketaUpdate.birthDay,
                address:anketaUpdate.address,
                education:anketaUpdate.education,
                specialty:anketaUpdate.specialty,
                workStudy:anketaUpdate.workStudy
            },
            include: {
                User: true
            }
        })
        return updateAnketa;
    }throw new Error("You are not the author of this Anketa")
    
//   id        BigInt   @id @default(autoincrement())
//   birthDay  DateTime
//   address   String   @db.VarChar(255)
//   education String   @db.VarChar(255)
//   specialty String   @db.VarChar(255)
//   workStudy String   @db.VarChar(255)
//   User      User[]
}

methods.getAll = async function() {
    const getAllAnketa = await prisma.anketa.findMany({
        include: {
            User: true
        }
    });
    return getAllAnketa;
}

methods.getOne = async function(userId) {
    const result = await prisma.user.findFirst({
        where: {id: BigInt(userId)},
        select: {
            Anketa: true 
        }
    })
    return result;
}

methods.delete = async function(anketaId,userId){
    const isExist = await prisma.user.findFirst({
        where: {
            id: BigInt(userId)
        },
        include: {
            Anketa: true
        }
    });
    if(!isExist) throw new Error('User is not found');

    if(isExist.anketaId==anketaId){
        const deleteAnketa = await prisma.anketa.delete({
            where: {
                id: BigInt(anketaId)
            },
            include: {
                User: true
            }
        });
        return deleteAnketa;
    }
    throw new Error("You are not the author of this Anketa");
}

module.exports = methods;

const prisma = require('../../prisma');
const methods = {
    create: null,
    getAll: null,
    update: null,
    delete: null,
}


methods.getAll = async function() {   
    const genre = await prisma.genre.findMany();
    return genre; 
}   



methods.create = async function(data) {   
    const genre = await prisma.genre.create({data});

    return genre; 
}   

methods.update = async function(data) {
    const genre = await prisma.genre.update({
        where: {
          id: BigInt(data.id),
        },
        data: {
          name: data.name,
        },
      });

    return genre;
}

methods.delete = async function(data) {
    const isExist =  await prisma.genre.findUnique({
        where:{
            id: BigInt(data.id),
        }
    })
    if (!isExist) return 'Genre already does not exist'
    
    const genre = await prisma.genre.delete({
        where: {
          id: BigInt(data.id)
        },
      })
      
    return genre;
}


module.exports = methods
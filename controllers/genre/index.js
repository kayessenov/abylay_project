const prisma = require('../../prisma');
const redisClient = require('../../cache-storage/redisClient')
const methods = {
    create: null,
    getAll: null,
    update: null,
    getOne: null,
    delete: null,
}


methods.getAll = async function() {   
    const genre = await prisma.genre.findMany();
    await redisClient.set("asd", 'asdsdasd', "EX", 60 * 60)
    const result = await redisClient.get("asd")
    console.log({result})
    return genre; 
}   

methods.getOne = async function(data) {
  const isExist = await prisma.genre.findUnique({
    where:
    {
      id: BigInt(data.id)
    }
  })

  if(!isExist) return "Genre already does not exist"

  return isExist;
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
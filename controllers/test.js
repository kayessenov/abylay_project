const prisma = require('../prisma');


(async()=>{

    const create = await prisma.Genre.create({
        data: {
            name: "Detective"
        }
    })
    console.log(create)

    const result = await prisma.Genre.findMany()

    console.log(result)

})()
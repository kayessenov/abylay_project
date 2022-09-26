const { booking } = require("../../prisma");
const prisma = require("../../prisma")
const methods = {
    getOne: null,
    create: null,
    getAll: null,
    update: null,
    delete: null,
}

methods.create = async function(BookingData, userId) {
    const createBooking = await prisma.booking.create({
        data: {
         received_date: BookingData.received_date,
         expiration_date: BookingData.expiration_date,   
         Book: {
            connect: {
                id: BigInt(BookingData.bookId)
            },
         },
         User: {
            connect: {
                id: BigInt(userId)
            }
         }
        },
        include: {
            Book: true,
            User: true
        }
        

    })

    return createBooking;
}


// model Booking {
//     id               BigInt   @id @default(autoincrement())
//     received_date    DateTime
//     expiration_date  DateTime
//     return_date      DateTime
//     userId           BigInt
//     bookId           BigInt
//     isExtend         Boolean  @default(false)
//     isExtendApproved Boolean  @default(false)
//     Book             Book     @relation(fields: [bookId], references: [id], onDelete: NoAction)
//     User             User     @relation(fields: [userId], references: [id], onDelete: NoAction)
//   }

methods.update = async function(BookingData){
    const isExist = await prisma.Booking.findUnique({
        where: {
            id: BigInt(data.id)
        }
    })
    if(!isExist) return "Booking already does not exist";

    const updateBooking = await prisma.Booking.update({
        where: {
            id: BigInt(data.id)
        },
        data: {
            isExtend: true 
        },
        include: {
            Book: true,
            User: true
        }
    })

    return updateBooking;
}

methods.delete = async function(data) {
    const isExist = await prisma.booking.findUnique({
        where: {
            id: BigInt(data.id)
        }
    })
    if(!isExist) return "Booking already does not exist"

    const deleteBooking = await prisma.Booking.delete({
        where: {
            id: BigInt(data.id)
        },
        include: {
            Book: true,
            User: true
        }
    })

    return deleteBooking;
}

methods.getAll = async function(data) {
    const getAllBooking = await prisma.booking.findMany({
        include: {
            Book: true,
            User: true
        }
    });
    return getAllBooking;
}

methods.getOne = async function(data) {
    const isExist = await prisma.booking.findUnique({
        where: {
            id: BigInt(data.id)
        },
        include: {
            Book: true,
            User: true
        }
    })

    if(!isExist) return "Booking already does not exist"

    return isExist;

}

module.exports = methods;
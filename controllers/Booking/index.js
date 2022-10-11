const { booking } = require("../../prisma");
const prisma = require("../../prisma");
const dateHelp = require("../../utils/date")
const date = require("../../utils/date");
const methods = {
    getOne: null,
    create: null,
    getAll: null,
    update: null,
    delete: null,
    extend: null,
    getExtendsList: null,
    approveExtend: null,
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

methods.extend = async function(bookingId) {
    const isExist = await prisma.booking.findUnique({
        where: {
            id: BigInt(bookingId),
        }
    })

    if(!isExist) throw new Error("Booking already does not exist")



    const isExtendBooking = await prisma.booking.update({
        where: {
            id: BigInt(bookingId)
        },
        data: {
            isExtend: true
        },
    })

    return isExtendBooking;
}

methods.getExtendsList = async function() {
    const getExtendAll = await prisma.booking.findMany({
        where: {
            isExtend: true
        },
        orderBy: {
            expiration_date: 'asc'
        }
    })

    return getExtendAll;
}

methods.approveExtend = async function(bookingId) {
    const isExist = await prisma.booking.findUnique({
        where: {
            id: BigInt(bookingId),
        }
    })

    if(!isExist) throw new Error("Booking doesnt found")

    if(isExist.isExtendApproved) throw new Error("Booking already extended")


    let date = new Date(isExist.expiration_date);

    let expiration_date = date.setDate(date.getDate() + 15);

    expiration_date = dateHelp(expiration_date);

    const approve = await prisma.booking.update({
        where: {
            id: BigInt(bookingId)
        },
        data: {
            isExtendApproved:true,
            expiration_date
        }
    })

    return approve;
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
const { PrismaClient } = require('@prisma/client');

let prisma = new PrismaClient({
	log: ['error', 'query']
});

BigInt.prototype.toJSON = function () {
	return this.toString();
};

module.exports = prisma;
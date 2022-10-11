const config = require("../../config/config.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const methods = {
	registration: null,
	login: null, 
	findUser: null
};
const prisma = require("../../prisma");



methods.registration = async function ({phoneNumber, firstName, lastName,fatherName, avatar, password, IIN,  role = "USER"}) {
	const user = await prisma.user.findFirst({
		where: {
			phoneNumber
		}
	});
	if (user) {
		throw new Error("User already exist");
	}
	password = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
	const result = await prisma.User.create({
		data: {
			phoneNumber,firstName, lastName, fatherName, avatar, IIN,password, role
		}
	});
	const token = jwt.sign(JSON.parse(JSON.stringify({ id: result.id, role: result.role })), config.secret_key, { expiresIn: 86400 * 30 });
	jwt.verify(token, config.secret_key, function (err, data) {
		console.log(err, data);
	});
	result.password = null;
	return { token, user: result };
};

methods.login = async function ({password, phoneNumber}) {
	const user = await prisma.User
		.findFirst({
			where: {
				phoneNumber: phoneNumber
			}
		});
	if (!user) {
		throw new Error("Authentication failed. User not found.");
	}
	const passwordIsValid = bcrypt.compareSync(
		password,
		user.password
	);
	if (passwordIsValid) {
		const token = jwt.sign(JSON.parse(JSON.stringify({ id: user.id, role: user.role })), config.secret_key, { expiresIn: 86400 * 30 });
		jwt.verify(token, config.secret_key, function (err, data) {
			console.log(err, data);
		});
		user.password = null;
		return { token, user };
	} else {
		throw new Error("Authentication failed. Wrong password.");
	}
};

methods.findUser = async function({ firstName, lastName, IIN }) {
	const user = await prisma.user.findFirst({
		where: {
			firstName: firstName,
			lastName: lastName,
			IIN: IIN
		},
		include: {
			Booking: true,
			Comment: true,
			Response: true,
			Anketa: true
		}
	})

	return user;
}

module.exports = methods;

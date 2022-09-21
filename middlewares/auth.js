const { user } = require('../prisma');
const prisma = require('../prisma');
const jwt = require("jsonwebtoken");
const config = require("../config/config.json")

const isAuth = async (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers.authorization;
	if (token) {
		jwt.verify(token, config.secret_key, (err, decoded) => {
			if (err) {
				console.error(err);
				return res.json({ success: false });
			}
			req.user = {};
			req.user.id = decoded.id;
			
		});
		next();
		return
	}
	return res.json({ success: false, data: "Auth error" });
};

const isModer = async (req, res, next) => {
	const moder = await prisma.User.findUnique({
		where: {
			id: BigInt(req.user.id)
		}
	})

	if(user.role === "MODERATOR") {
		return next();
	}

	return res.json({ success: false, data: "Permission denied!"});
}

const ModerOrAdmin = async (req, res, next) => {
	const user = await prisma.user.findUnique({
		where: {
			id: BigInt(req.user.id)
		}
	})

	if(user.role === "MODERATOR" || user.role === "ADMIN") {
		return next();
	}

	return res.json({success : false, data: "Permission denied!"});
}

const isOperator = async (req, res, next) => {
	const user = await prisma.user.findUnique({
		where: {
			id: BigInt(req.user.id)
		}
	})

	if(user.role === "OPERATOR") return next();

	return res.json({success : false, data: "Permission denied!"});
}

const isAdmin = async (req, res, next) => {
	const user = await prisma.User.findUnique({
		where: {id: BigInt(req.user.id)}
	})

	if(user.role === "ADMIN"){
		return next();
	}

	return res.json({ success: false, data: "Permission denied!" });

}

const isNotUser = async (req, res, next) => {
	const user = await prisma.User.findUnique({
		where: {
			id: BigInt(req.user.id)
		}
	})

	if(user.role !== "USER") return next();

	return res.json({ success: false, data: "Permission denied!" });
	
}


module.exports = {isAuth, isAdmin, ModerOrAdmin, isOperator, isNotUser, isModer};
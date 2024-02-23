const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");

app.use(express.json());
app.use(cookieparser());

mongoose.connect("mongodb://127.0.0.1:27017/test");

const schema = new mongoose.Schema({
	username: String,
	password: String,
	name: String,
});

const Users = mongoose.model("Users", schema);

function userExists(username, password) {
	// write logic to return true or false if this user exists
	// in ALL_USERS array
	let b = false;
	Users.find().forEach((i) => {
		if (i.username === username) {
			console.log("first");
			if (i.password === password) {
				console.log("second");
				b = true;
				// return true;
			}
		}
	});
	//   return false;
	return b;
}

function tokenVarification(req, res, next) {
	// console.log(req.cookies.token);
	try {
		const decoded = jwt.verify(req.cookies.token, jwtPassword);
		console.log(decoded.username + " accessed.");
		next();
	} catch (error) {
		res.json({
			msg: "Not Signed In",
			error,
		});
	}
}
//

app.get("/", async function (req, res) {
	// console.log(req.cookies.token);

	// console.log(await Users.find());
	res.send("Hello World to jwt and authentication and db");
});

app.post("/signup", async (req, res) => {
	let user1 = await Users.findOne({ username: req.body.username });
	console.log(Users.findOne({ username: req.body.username }));
	if (user1) {
		return res.json({
			msg: "Username already Exists.",
		});
	}

	let user = Users.create({
		username: req.body.username,
		password: req.body.password,
		name: req.body.name,
	});

	res.json({
		msg: "User Created.",
		user,
	});
});

app.post("/login", (req, res) => {
	let user = Users.findOne({
		username: req.body.username,
		password: req.body.password,
	});
	if (!user) {
		res.json({
			msg: "Username not Exists.",
		});
	}
	let token = jwt.sign({ username: req.body.username }, jwtPassword);
	res.cookie("token", token);
	res.json({
		msg: "Loggen in and token Cookkied.",
		token: token,
	});
});

app.post("/logout", tokenVarification, (req, res) => {
	res.clearCookie("token");
	res.json({
		msg: "token in cookie destroyed.",
	});
});

app.get("/readuser", tokenVarification, async (req, res) => {
	let decode = jwt.verify(req.cookies.token, jwtPassword);
	res.json(await Users.findOne({ username: decode.username }));
});

app.get("/listall", tokenVarification, async (req, res) => {
	res.json(await Users.find());
});

app.listen(3000, (res) => {
	console.log("listening at port : 3000");
});

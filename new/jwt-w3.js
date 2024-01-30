const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";
// const bodyParser = require("bodyparser");

const app = express();
app.use(express.json());

const ALL_USERS = [
	{
		username: "harkirat@gmail.com",
		password: "123",
		name: "harkirat singh",
	},
	{
		username: "raman@gmail.com",
		password: "123321",
		name: "Raman singh",
	},
	{
		username: "priya@gmail.com",
		password: "123321",
		name: "Priya kumari",
	},
];

function userExists(username, password) {
	// write logic to return true or false if this user exists
	// in ALL_USERS array
	let b = false;
	ALL_USERS.forEach((i) => {
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
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcmtpcmF0QGdtYWlsLmNvbSIsImlhdCI6MTcwNTYwMDg1MH0.KRvHGFNnRAhzbg6asn4OCCqfAEDoyizKgmO-Jecr2vU

app.post("/signin", function (req, res) {
	let username = req.body.username;
	let password = req.body.password;

	if (!userExists(username, password)) {
		return res.status(403).json({
			msg: "User doesnt exist in our in memory db",
		});
	}

	var token = jwt.sign({ username: username }, "shhhhh");
	return res.json({
		token,
	});
});

app.get("/users", function (req, res) {
	const token = req.headers.authorization;
	//   console.log(jwt.verify(token, jwtPassword));
	//   console.log("df");
	try {
		const decoded = jwt.verify(token, jwtPassword);
		const username = decoded.username;
		// return a list of users other than this username
		let list = ALL_USERS.filter((i) => i.username != username);
		return res.send(list);
	} catch (err) {
		return res.status(403).json({
			//   msg: "Invalid token",
			err,
		});
	}
});

app.listen(3000);

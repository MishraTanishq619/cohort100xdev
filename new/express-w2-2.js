const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const { log } = require("console");

app.use(express.json()); // to acces req.body in post reqs

app.get("/", (req, res) => {
	res.send("<b>Hello Mr. India</b>");
});

app.get("/Hi", (req, res) => {
	console.log(req.query);
	const n = req.query.n;
	res.send("Number is : " + n);
	// res.send("hello");
});

app.post("/", (req, res) => {
	console.log(req.body);
	res.json({
		msg: "Done!",
	});
});

app.listen(PORT, () => {
	console.log("Listening at port :" + PORT);
});

//async functions runs along, sync funcs runs one by one.

// busy waiting
const busyWait = () => {
	let a = 0;
	while (a < 1000000000) {
		a++;
	}
};

console.log("Hello World.");

const fs = require("fs");

// this will run at last as pending callbacks.
fs.readFile("a.txt", "utf-8", (err, data) => {
	console.log(data);
});

const PromiseReadFile = () => {
	return new Promise(
		(res) => {
			fs.readFile("a.txt", "utf-8", (err, data) => {
				res(data + "2323");
			});
		},
		(rej) => {
			rej("not Found.");
		}
	);
};

PromiseReadFile().then((d) => {
	console.log(d);
});
// console.log(PromiseReadFile());

const p1 = new Promise((res) => {
	res("promise.");
});

console.log(p1);

p1.then((data) => {
	console.log(data);
});

// Pr2
const Prfunc = () => {
	return new Promise((res) => {
		res("Async Promise ..Hi There.");
	});
};
//Callr of promise needs to async-await
const Pr2 = async () => {
	p2 = await Prfunc();
	console.log(p2);
};

Pr2();

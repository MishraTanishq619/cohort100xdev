const express = require("express");
const zod = require("zod"); // zod - for validations
// zod.schema .parse / .safeParse

const app = express();
app.use(express.json());

// middlewares
let reqCounts = 0;
const reqRate = (req, res, next) => {
  reqCounts++;
  next();
};

const schema2 = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});
const intSchema = zod.number();
app.get("/", reqRate, (req, res) => {
  //   console.log(reqCounts);
  //   console.log(req.query.n);
  if (req.query.n) {
    let num = intSchema.parse(parseInt(req.query.n));
    // if (!num.success) {
    //   res.status(404).json({
    //     msg: "Num not Found",
    //   });
    // } else {
    reqCounts += num;
    // }
    // res.send(num);
  }
  res.send(reqCounts.toString());
});

// global Catch
app.use(function (req, res, next) {
  res.json({
    msg: "error with server.",
  });
});

app.listen(3000);

const dotenv = require("dotenv")
const mongoos = require("mongoose")
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
dotenv.config({path:'./config.env'})
require("./dbcon")
app.use(express.json());
app.use(cookieParser())
app.use(require("./auth"));

const PORT = process.env.PORT;

// const mongoose = require("mongoose");
// mongoose
//   .connect(
//     "link"
//   )
//   .then(() => {
//     app.listen(3000, () => {
//       console.log(`server running on port 3000`);
//     });
//   })
//   .catch((error) => console.log(error));

// const {MongoClient} = require('mongodb')

// const DB =
//   "link"
// MongoClient.connect(DB)

//   .then(() => {
//     console.log(`connnection successful`);
//   })
//   .catch((err) => (console.log(`no connection`), console.log(err)));
// app.get('/', (req, res) => {
//     res.send(`Hello world from the server app.js`);
// });

const middleware = (req, res, next) => {
  console.log(`Hello my Middleware`);
  next();
};
app.get("/about", middleware, (req, res) => {
  console.log(`Hello my About`);
  res.send(`Hello About world from the server`);
});

app.get("/contact", (req, res) => {
  res.cookie("test","data")
  res.send(`Hello Contact world from the server`);
});

app.get("/signin", (req, res) => {
  res.send(`Hello Login world from the server`);
});

app.get("/signup", (req, res) => {
  res.send(`Hello Registration world from the server`);
});

app.listen(PORT, () => {
  console.log(`server is runnig at port no ${PORT}`);
});

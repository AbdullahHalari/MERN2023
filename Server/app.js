const dotenv = require("dotenv")
const mongoos = require("mongoose")
const express = require("express");
const app = express();

dotenv.config({path:'./config.env'})
require("./dbcon")
app.use(express.json());

app.use(require("./auth"));

const PORT = process.env.PORT;

// const mongoose = require("mongoose");
// mongoose
//   .connect(
//     "mongodb://127.0.0.1:27017/Cluster0?retryWrites=true&w=majority"
//   )
//   .then(() => {
//     app.listen(3000, () => {
//       console.log(`server running on port 3000`);
//     });
//   })
//   .catch((error) => console.log(error));

// const {MongoClient} = require('mongodb')

// const DB =
//   "mongodb+srv://halari4321:dan1d1h890>@cluster0.5sg5anc.mongodb.net/Cluster0?retryWrites=true&w=majority";
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

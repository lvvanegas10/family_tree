require("./config/config");

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const bodyParser = require("body-parser");

// CORS Express middleware to enable CORS Requests.
const cors = require("cors");

app.use(bodyParser.json());

app.options("*", cors());

app.use(cors());

app.use(require("./routes/index"));

// PRUEBA GOOGLE
const path = require("path");
app.use(express.static(path.resolve(__dirname, "../public")));

mongoose.set('useCreateIndex', true);

const mongo = mongoose.connect(process.env.URLDB, { useNewUrlParser: true });
mongo.then(() => {
  console.log('connected');
}).catch((err) => {
  console.log('err', err);
});

app.listen(process.env.PORT, () => {
  console.log("Listening to port: ", process.env.PORT);
});

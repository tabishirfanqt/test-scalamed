const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/config");
const bodyParser = require("body-parser");
const authRoutes = require('./routes/authRoutes')

const cookieParser = require("cookie-parser");
require("dotenv").config();
app.use(cookieParser());

connectDB();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'})); // define the size limit
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));	// define the size limit
app.use(express.json());

app.use(express.static("public"))


app.use('/', authRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});

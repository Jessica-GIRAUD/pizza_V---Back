require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const connection = require("./db");
const { verifyJWT } = require("./middlewares/jwt");

const { PORT } = process.env;

app.use(express.json());

// Parse URL-encoded bodies (as send by HTML forms)
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// middleware for cookies
app.use(cookieParser());

// routes

// get all pizzas
app.get("/pizzas", (req, res) => {
  const query =
    "SELECT p.idpizza, p.name, p.description, p.price, base.name AS base_name FROM pizza p LEFT JOIN base ON base_idbase = base.idBase";
  connection.query(query, [], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error while getting pizzas");
    }
    if (result) {
      return res.status(200).json(result);
    }
  });
});

app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use(verifyJWT);
app.use("/pizzas", require("./routes/pizzas"));

app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

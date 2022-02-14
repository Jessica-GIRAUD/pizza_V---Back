require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");

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

// routes
app.get("/", (req, res) => {
  res.send("Pizza Vera<");
});
app.use("/pizzas", require("./routes/pizzas"));
app.use("/admin", require("./routes/admin"));

app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

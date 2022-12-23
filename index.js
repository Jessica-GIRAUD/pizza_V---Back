require("dotenv").config();

const cors = require("cors");

const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");
const { verifyJWT } = require("./middlewares/jwt");

const { PORT } = process.env;
app.set("trust proxy", 1);

app.use(
  cors({
    origin: ["http://localhost:3000", "https://pizza-kika.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
// Parse URL-encoded bodies (as send by HTML forms)
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

// middleware for cookies
app.use(cookieParser());

// routes

app.use("/", require("./routes/globals"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));

app.use(verifyJWT);
app.use("/pizzas", require("./routes/pizzas"));
app.use("/actus", require("./routes/actus"));
app.use("/contact", require("./routes/contacts"));
app.use("/profile", require("./routes/profiles"));

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(PORT || 3000, () => {
  console.log(`Server listening on port ${PORT}`);
});

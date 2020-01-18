const express = require("express");
const LoggerJS = require("./logger");
const exphbs = require("express-handlebars");
const app = express();
const members = require("./Members");

// app.use(LoggerJS);

// Use Express HandleBars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get("/", (req, res) =>
  res.render("index", { title: "member App", members })
);

// Members API routes
app.use("/api/members", require("./routes/api/members.js"));

// Starting page
app.get("/", (req, res, err) => {
  console.log("Hello world");
  res.send("<h1>Hi!</h1>");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started...");
});

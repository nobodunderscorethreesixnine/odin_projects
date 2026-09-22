const express = require("express");
const path = require("node:path");
const { indexRouter } = require("./routes/indexRouter.js");

const app = express();
const port = 3000;

// views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.listen(port);

app.use((err, req, res, next) => {
  res.status(404).render("404");
});

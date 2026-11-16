try {
  process.loadEnvFile();
} catch (e) {}
const express = require("express");
const path = require("node:path");
const { indexRouter } = require("./routes/indexRouter.js");

const app = express();
const PORT = process.env.PORT;

// views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

//error handling
app.use((req, res, next) => {
  res.status(404).render("404");
});

app.use((err, req, res, next) => {
  res.status(500).send("Server Error");
});

app.listen(PORT);

// now is this how real world developer do this, can you once again explain me the concept , why we create the env file at first only and then write or with process.env.DB_URL etc. And also why we need populatedb.js at first place , can you explain every concept in detail. And main question does this happen in reael development and does real world developer do this ?
//
// 2. And after teaching me, i want you to analyze each and evey thing i have coded to accomplish the mini_message_board. Be brutal honest and tell what i can do better, what i did nice, what i need to improve. Everything. And How each and everything is working.
//
// Now again read the antigravity message and because it is telling me to run the databse seeding command but how i have to read and find out and ask above question
// to antigravity and delete it. First deploy sucessfully and thhen ask antigravity every question

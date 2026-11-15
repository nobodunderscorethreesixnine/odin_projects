const { Router } = require("express");
const indexRouter = Router();
const {
  getMessages,
  getMessageForm,
  postMessage,
  getUser,
} = require("../controllers/indexController.js");

indexRouter.get("/", getMessages);

indexRouter.get("/new", getMessageForm);

indexRouter.post("/new", postMessage);

indexRouter.get("/:user", getUser);

module.exports = { indexRouter };

// TODO:
// 1. Now i will first learn about sql from sqlbot or i can learn direct postgreSQL from w3school, and create table,everything own my own.Because to make the table i have to look in TOP to even generate an id.
// 2. now implement database by myself, and in confusion i will
// again read the notes and odin article and continue , Also i will not
// waste time more then 3,4 minute on debugging i will ask ai

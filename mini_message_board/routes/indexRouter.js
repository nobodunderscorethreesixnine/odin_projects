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

const { incrementId } = require("../idIncrementer.js");
const db = require("../db/queries.js");
const { body, validationResult, matchedData } = require("express-validator");

const lengthErr = "must be between 1 and 20 characters";

// const messages = [
//   { text: "Hi, there", user: "Amando", added: new Date(), id: incrementId() },
//   {
//     text: "Hello World",
//     user: "Charles",
//     added: new Date(),
//     id: incrementId(),
//   },
// ];

// function getMessages(req, res) {
//   res.render("index", { title: "Mini Message Board", messages: messages });
// }

//implementing validation
const validateUser = [
  body("authorName")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`Username ${lengthErr}`),
  body("msgText")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Message cannot be empty"),
];

async function getMessages(req, res) {
  const messages = await db.getAllMessages();
  // console.log(messages[0].id);
  res.render("index", { title: "Mini Message Board", messages: messages });
}

function getMessageForm(req, res) {
  res.render("form");
}

// function postMessage(req, res) {
//   const msgText = req.body.msgText;
//   const authorName = req.body.authorName;
//   messages.push({
//     text: msgText,
//     user: authorName,
//     added: new Date(),
//     id: incrementId(),
//   });
//   res.redirect("/");
// }

const postMessage = [
  validateUser,
  async (req, res) => {
    const msg = req.body.msgText || "";
    const userMsg = req.body.authorName || "";
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        errors: errors.array(),
        msgText: msg,
        authorName: userMsg,
      });
    }
    const { msgText: message, authorName: username } = matchedData(req);
    await db.insertMessage({ message, username });
    res.redirect("/");
  },
];

// async function postMessage(req, res) {
//   // const msg = req.body.msgText;
//   // const username = req.body.authorName;
//   const { msgText: message, authorName: username } = req.body;
//   await db.insertMessage({ message, username });
//   res.redirect("/");
// }

// function getUser(req, res) {
//   const { user } = req.params;
//   const userMsg = messages.find((msg) => msg.id === Number(user));
//   if (!userMsg) {
//     return res.status(404).render("404");
//   }
//   res.render("message", { msg: userMsg });
// }

async function getUser(req, res) {
  const { user: userID } = req.params;
  const user = await db.getUser(userID);
  if (!user) {
    console.error("error");
    return res.status(404).render("404");
  }
  console.log(user);
  res.render("message", { message: user });
}

// now try to tinker why server error when i am clicking the
// open button firgure out and if not then ask ai for where
// to look at without hint

module.exports = { getMessages, getMessageForm, postMessage, getUser };

const { incrementId } = require("../idIncrementer.js");

const messages = [
  { text: "Hi, there", user: "Amando", added: new Date(), id: incrementId() },
  {
    text: "Hello World",
    user: "Charles",
    added: new Date(),
    id: incrementId(),
  },
];

function getMessages(req, res) {
  res.render("index", { title: "Mini Message Board", messages: messages });
}

function getMessageForm(req, res) {
  res.render("form");
}

function postMessage(req, res) {
  const msgText = req.body.msgText;
  const authorName = req.body.authorName;
  messages.push({
    text: msgText,
    user: authorName,
    added: new Date(),
    id: incrementId(),
  });
  res.redirect("/");
}

function getUser(req, res) {
  const { user } = req.params;
  const userMsg = messages.find((msg) => msg.id === Number(user));
  if (!userMsg) {
    return res.status(404).render("404");
  }
  res.render("message", { msg: userMsg });
}

module.exports = { getMessages, getMessageForm, postMessage, getUser };

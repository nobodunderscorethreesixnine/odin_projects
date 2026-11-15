const pool = require("./pool.js");

async function getAllMessages() {
  const { rows } = await pool.query("select * from messages");
  return rows;
}

async function insertMessage({ message, username }) {
  await pool.query("insert into messages (message,username) values ($1 ,$2) ", [
    message,
    username,
  ]);
}

async function getUser(msgId) {
  const { rows } = await pool.query("select * from messages where id = ($1)", [
    msgId,
  ]);
  return rows[0];
}

// if (!userMsg) {
//   return res.status(404).render("404");
// }
// res.render("message", { msg: userMsg });

module.exports = { getAllMessages, insertMessage, getUser };

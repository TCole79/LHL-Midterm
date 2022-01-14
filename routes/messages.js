const express = require("express");
const router = express.Router();

/* Messages – BREAD

Browse – USER can view all their messages
    = GET / messages
Read – USER can read a specific message
    = GET / messages / :id
Add – USER can send a message
    = POST / messages

*/
//module.exports = function(db) {

  // router.get("/messages", (req, res) => {
  //   // fetch all messages // parse them as json // pass them to the template as templateVars
  //   db.query("SELECT * FROM messages")
  //     .then((data) => {
  //       const messages = data.rows;
  //       console.log(data.rows);
  //       res.render("messages", {messages});
  //     })
  //     .catch((err) => {
  //       console.log("Error message: ", err.message);
  //       res.status(500).json({ error: err.message });
  //     });
  // });
  //return router;
//};
//   router.get("/", (req, res) => {
//     db.query("SELECT * FROM messages")
//       .then((data) => {
//         const messages = data.rows;
//         res.json(messages);
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err.message });
//       });
//   });

//   router.post("/", (req, res) => {
//     const userId = req.session.users(id);
//     db.addMessage({ ...req.body, user_id: userId })
//       .then((messages) => {
//         res.send(messages);
//       })
//       .catch((err) => {
//         console.log("Error message: ", err.message);
//         res.send(err);
//       });
//   });

//   router.get("/:id", (req, res) => {
//     db.query("SELECT * FROM messages WHERE user(id) = user_id AND message(id) = message_id")
//       .then((data) => {
//         const messages = data.rows;
//         res.json(messages);
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err.message });
//       });
//   });

//   router.post("/:id", (req, res) => {
//     const userId = req.session.userId;
//     db.addMessage({ ...req.body, user_id: userId })
//       .then((messages) => {
//         res.send(messages);
//       })
//       .catch((err) => {
//         console.log("Error message: ", err.message);
//         res.send(err);
//       });
//   });

//   return router;
// };




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
module.exports = function(db) {

/////----- BROWSE all messages -----/////
  router.get("/messages", (req, res) => {
    db.query("SELECT * FROM messages WHERE id=$1", [req.params.id])
    .then((data) => {
      console.log("message: ", data.rows);
      const message = data.rows[0];
      res.json(message);
    })
    .catch((err) => {
      console.log("Error message: ", err.message);
      res.status(500).json({ error: err.message });
    });
});

/////----- BROWSE all messages END-----/////



/////----- READ specific message -----/////
  router.get("/messages/:id", (req, res) => {
    db.query("SELECT * FROM messages WHERE message_id REFERENCES message(id)=$1", [req.params.id])
    .then((data) => {
      console.log("message: ", data.rows);
      const message = data.rows[0];
      res.json(message);
    })
    .catch((err) => {
      console.log("Error message: ", err.message);
      res.status(500).json({ error: err.message });
    });
});

/////----- READ Specific Message END -----/////



/////----- ADD Message -----/////
  router.post("/messages", (req, res) => {
    const userID= req.session["user_id"];
     if (!userID) {
      res.redirect("/login");
  }

  const templateVars = {
  user: users[req.session["user_id"]],
  userID,
  }
  res.render("/messages_new", templateVars);
});

/////----- ADD END -----/////

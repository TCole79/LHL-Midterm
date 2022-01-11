/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
// const bcrypt = require('bcrypt');
module.exports = function(db) {

// const userRoutes = function (db) {
  router.get("/:id", (req, res) => {
    db.query("SELECT * FROM users WHERE id=$1", [req.params.id])
      .then((data) => {
        console.log("user check: ", data.rows);
        const user = data.rows[0];
        res.json(user);
      })
      .catch((err) => {
        console.log("Error message: ", err.message);
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/", (req, res) => {
    db.query("SELECT * FROM users")
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/listings");
  });
  return router;

};


//module.exports = function(router, database)

//

  /* MORE

    SPACE

    HERE

  */

//   return router;
// };

// module.exports = userRoutes;

// ////---- USER LOGOUT START ----////
//
// ////---- USER LOGOUT END ----////

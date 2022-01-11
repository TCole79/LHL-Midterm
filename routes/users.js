/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const userRoutes = function (db) {
  router.get("/:id", (req, res) => {
    db.query("SELECT * FROM users WHERE id=$1", [req.params.id])
      .then(data => {
        console.log("user check: ", data.rows);
        const user = data.rows[0];
        res.json(user);
      })
      .catch(err => {
        console.log("Error message: ", err.message);
        res
          .status(500)
          .json({ error: err.message });
      });
  });
<<<<<<< HEAD
  return router;
};
const bcrypt = require('bcrypt');

module.exports = function(router, database) 
=======
>>>>>>> 70d358bd6052b967a663cc5c4ac89140a931ccdb

  router.get("/", (req, res) => {
    db.query("SELECT * FROM users")
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  /* MORE

    SPACE

    HERE

  */

  return router;
};

module.exports = userRoutes;

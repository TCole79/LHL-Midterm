const express = require("express:");
const { database } = require("pg/lib/defaults");
const router = express.Router();

/* FAVOURITES – BREAD

Browse – USER can view all their favourites
	= GET / favorites
Read – USER can view specific favourite
	= GET / favourites / :id
Add – USER can add a favourite
	= POST / favourites
Delete – USER can remove a favorite from their list of favourites
	= POST / favourites / :id / delete
  */

module.exports = function (db) {
  /////----- BROWSE (RETURN ALL FAVS) -----/////
  router.get("/favorites", (req, res) => {
    db.query(
      `SELECT * FROM favourites
      JOIN listings ON listing_id = listings.id
      WHERE favourites.user_id = $1`,
      [req.session.user_id]
    )

      .then((data) => {
        const favourites = data.rows;
        res.json({ favourites });
      })

      .catch((err) => {
        console.log("Error message: ", err.message);
        res.status(500).json({ error: err.message });
      });
  });
  /////----- BROWSE END-----/////

  /////----- READ (RETURN SPECIFIC FAV) -----/////
  router.get("/favorites/:id", (req, res) => {
    db.query(
      `SELECT * FROM favourites
      JOIN listings ON listing_id = listings.id
      WHERE favourites.user_id = $1
      AND favourites.id = $2`,
      [req.session.user_id, req.params.id]
    )

      .then((data) => {
        const favourites = data.rows;
        res.json({ favourites });
      })

      .catch((err) => {
        console.log("Error message: ", err.message);
        res.status(500).json({ error: err.message });
      });
  });
  /////----- READ END -----/////

  /////----- ADD FAVOURITE-----/////
  router.post("/favorites", (req, res) => {
    const listing_id = req.body.listing_id;
    const user_id = req.session.user_id;

    db.query(
      `INSERT INTO favourites (listing_id, user_id)
        VALUES ($1, $2)
        RETURNING *`, [listing_id, user_id] // research this further
    )

      .then((data) => {
        res.redirect("/listings");
      })

      .catch((err) => {
        console.log("Error message: ", err.message);
        res.status(500).json({ error: err.message });
      });
  });
  /////----- ADD END -----/////

  /////----- DELETE FAVOURITE -----/////
  router.post("/:id/delete", (req, res) => {
    db.query(
      `DELETE FROM favourites
      WHERE user_id = $1
      AND listing_id = $2`,
      [req.session.user_id, req.params.id]
    )

      .then((data) => {
        res.redirect("/favourites");
      })

      .catch((err) => {
        console.log("Error message: ", err.message);
        res.status(500).json({ error: err.message });
      });

    router.get("/favourites", (req, res) => {
      res.redirect("/");
    });
  });
  /////----- DELETE END -----/////

  return router;
};

////---- Favourite Listings start----///
// router.get("/listings/:favourite", (req, res) => {
//   const userID = req.session["user_id"];
//   if (!userID) {
//     res.redirect("/login");
//   }

//   const templateVars = {
//     user: users[req.session["user_id"]],
//     userID,
//   };
//   res.render("listings_favourite", templateVars);
// });

// router.post("/listings/:favourite") => {

// const userID = req.session["user_id"];
// if (!userID) {
//   res.redirect("/login");
// }

// const templateVars = {
//   user: users[req.session["user_id"]],
//   userID,
// };
// res.render("listings_favourite", templateVars);
// };
// ///----- Favourite Listings end ----////

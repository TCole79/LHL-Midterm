const express = require("express");
const router = express.Router();

/*
HOMEPAGE – BREAD
Browse – USER can see featured items, or filter by price
    = GET / listings
Read – USER can see specific listing information
    = GET / listings / :id
Edit – ADMIN can edit data for specific listing (includes mark as SOLD!)
    = POST / listings / :id
Add – ADMIN can add a listing
    = POST / listings
Delete – ADMIN can delete specific listing
    = POST / listings / :id / delete
*/

/////----- BROWSE ALL START -----/////
module.exports = function (db) {
  router.get("/", (req, res) => {

    const userID = req.session.user_id;

    db.query("SELECT * FROM listings")

      .then((data) => {
        const listings = data.rows;
        res.render("listings", { listings, user_id });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  /////----- BROWSE ALL END -----/////


  ////---- READ SPECIFIC LISTING START ----////
  router.get("/:id", (req, res) => {
    db.query(`SELECT * FROM listings WHERE id = $1`, [req.params.id])

      .then((data) => {
        const listing = data.rows[0];
        res.render("listings", { listings, user_id });
      })

      .catch((err) => {
        console.log("Error message: ", err.message);
        res.status(500).json({ error: err.message });
      });
  });
  ////---- READ SPECIFIC LISTING END ----////

  ////---- EDIT LISTING START ----////
  router.get("/listings/:id", (req, res) => {
    // think we need javascript here to address adding each listing element (title, description, status, photo_url, cost)
    // user wants to change one or more listing properties, but how to do that?
    // user is adding to our database, so we need to push data that overwrites one or more parts at a time
    /* pseudo follows
    if ADMIN wants to change (title) how to do that?
    if(description)
    if(status)
    if(photo_url)
    if(cost)
    */

    db.query() // what goes here?

      .then((data) => {
        const listing = data.rows[0];
        res.redirect("/listings");
      })

      .catch((err) => {
        console.log("Error message: ", err.message);
        res.status(500).json({ error: err.message });
      });
  });
  ////---- EDIT LISTING END----////

  ////---- ADD NEW LISTING START ----////
  router.post("/listings", (req, res) => {
    db.query(
      `INSERT INTO listings (user_id, title, description, status, photo_url, cost)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        req.session.user_id,
        req.body.name,
        req.body.title,
        req.body.description,
        req.body.status,
        req.body.photo_url,
        req.body.cost,
      ]
    )

      .then((data) => {
        const listings = data.rows[0];
        res.redirect("/listings");
      })

      .catch((err) => {
        console.log("Error message: ", err.message);
        res.status(500).json({ error: err.message });
      });
  });
  ////---- ADD NEW LISTING END----////

  ////---- DELETE LISTING START ----////
  router.post("/:id/delete", (req, res) => {
    db.query(`DELETE FROM listings WHERE id = $1`, [req.params.id])

      .then((data) => {
        res.redirect("/listings");
      })

      .catch((err) => {
        console.log("Error message: ", err.message);
        res.status(500).json({ error: err.message });
      });
  });
  ////---- DELETE LISTING END ----////

  return router;
};

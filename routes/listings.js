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
    db.query("SELECT * FROM listings")
      .then((data) => {
        const listings = data.rows;
        res.json(listings);
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
  router.post("/listings/edit/:id", (req, res) => {
    // we need to capture user input, ie a form - req.body
    //think we need javascript here to address adding each listing element (title, description, status, photo_url, cost)
    // user wants to change one or more listing properties, but how to do that?
    // user is adding to our database, so we need to push data that overwrites one or more parts at a time
    /* pseudo follows
    if ADMIN wants to change (title) how to do that?
    if(description)
    if(status)
    if(photo_url)
    if(cost)
    */

    // use SET + UPDATE psql commands - google this

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
  router.post("/listings/new", (req, res) => {
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
<<<<<<< HEAD
=======

// PSEDUO code - what do we need:
// get request for Browse/view all listings without being signed in
// make a FAVOURITE = get / post
// CREATE a listing = get / post
// EDIT a listing = get / post
// DELETE a listing = get / post
// SEARCH for **FCUKING FLAMETHROWERS**

////---- ROUTES START ----////
// router.get("/", (req, res) => {
//   const userID = req.session["user_id"];
//   if (!userID) {
//     res.redirect("/login");
//   }
//   res.redirect("/listings");
// });

// ////---- ADDING NEW LISTING START ----////
// router.get("/listings/new", (req, res) => {
//   const userID = req.session["user_id"];
//   if (!userID) {
//     res.redirect("/login");
//   }

//   const templateVars = {
//     user: users[req.session["user_id"]],
//     userID,
//   };
//   res.render("listings_new", templateVars);
// });

// ////---- ADDING NEW LISTING END----////

// ////---- EDITING LSITINGS START ----////
// // router.get("/listings/edit", (req, res) => {
// //   const longURL = urlDatabase[req.params.shortURL].longURL;
// //   res.redirect(longURL);
// // });

// //fix request (change it to a put request)
// router.get("/listings/edit", (req, res) => {
//   const userID = req.session["user_id"];
//   const editedListing = midterm[req.params.listing];

//   if (!userID || userID !== midterm.userID) {
//     res
//       .status(401)
//       .send(
//         `You must be logged in to edit your listings. Please try again. <a href="/login">Log Into Your Account </a>`
//       );
//     return;
//   }

//   const templateVars = {
//     user: users[req.session["user_id"]],
//     listing: req.params.listing_id,
//   };
//   res.render("/urls_show", templateVars);
// });

// router.post("/listings/id:edit", (req, res) => {
//   const userID = req.session["user_id"];
//   const listing_id = midterm[req.params.listing_id];

//   if (!userID || userID !== user_id) {
//     res
//       .status(401)
//       .send(
//         `You must be logged in to edit your listings. Please try again. <a href="/login">Log Into Your Account </a>`
//       );
//     return;
//   }

//   midterm[req.params.listing_id] = req.body.EditField;
//   res.redirect("/listings");
// });
// ////---- EDITING LISTINGS END----////

// ////---- DELETE LISTINGS START ----////
// router.post("/listings/delete", (req, res) => {
//   const userID = req.session["user_id"];
//   const listing = midterm[req.params.listings_id];
//   const idToDelete = req.params.listing_id;

//   if (!userID || userID !== users_id) {
//     res
//       .status(401)
//       .send(
//         `You must be logged in to delete listings you own. <a href="/login">Kindly log in to your account. </a>`
//       );
//   } else {
//     delete midterm[idToDelete];
//   }
//   res.redirect("/");
// });
// ////---- DELETE LISTINGS END ----////
>>>>>>> messagesEJS

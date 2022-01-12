// All routes for Listings are defined here
const express = require('express');
const router  = express.Router();
const db = require('../seeds/05_widgets')

app.set("view engine", "ejs");
app.use(
  cookieSession({
    name: "session",
    keys: ["cookie", "session"]
  }));

module.exports = function (router, database) {
  router.get("/listings", (req, res) => {
    database
      .getAllListings(req.query, 20)
      .then((listings) => res.send({ listings }))
      .catch((err) => {
        console.log("Error message: ", err.message);
        res.send(err);
      });
  });

  router.post("/listings", (req, res) => {
    const userId = req.session.userId;
    database
      .addListing({ ...req.body, user_id: userId })
      .then((listings) => {
        res.send(listings);
      })
      .catch((err) => {
        console.log("Error message: ", err.message);
        res.send(err);
      });
  });

  return router;
};

// PSEDUO code - what do we need:
// get request for Browse/view all listings without being signed in
// make a FAVOURITE = get / post
// CREATE a listing = get / post
// EDIT a listing = get / post
// DELETE a listing = get / post
// SEARCH for **FCUKING FLAMETHROWERS**

////---- ROUTES START ----////
router.get("/", (req, res) => {
  const userID = req.session["user_id"];
  if (!userID) {
    res.redirect("/login");
  }
  res.redirect("/listings");
// });

////---- ADDING NEW LISTING START ----////
router.get("/listings/:new", (req, res) => {
  const adminID = req.session["user_admin"];
  if (!adminID) {
    res.redirect("/login");
  }

  const templateVars = {
    user: users[req.session["user_admin"]],
    userID,
  };
  res.render("listings_new", templateVars);
});

router.post("/listings/:new")
const adminID= req.session["user_admin"];
if (!adminID) {
  res.redirect("/login");
}

const templateVars = {
  user: users[req.session["user_admin"]],
  userID,
};
res.render("listings_new", templateVars);
});
////---- ADDING NEW LISTING END----////


////---- EDITING LSITINGS START ----////
// router.get("/listings/edit", (req, res) => {
//   const longURL = urlDatabase[req.params.shortURL].longURL;
//   res.redirect(longURL);
// });

router.get("/listings/:id/edit", (req, res) => {
  const adminID = req.session["user_admin"];
  const editedListing  = midterm[req.params.listing];

  if (!adminID || adminID !== user_admin) {
    res
      .status(401)
      .send(
        `You must be logged in to edit your listings. Please try again. <a href="/login">Log Into Your Account </a>`
      );
    return;
  }

  const templateVars = {
    user: users[req.session["user_admin"]],
    listing: req.params.listing_id,
  };
  res.render("/listings", templateVars);
});

router.post("/listings/id:edit", (req, res) => {
  const adminID = req.session["user_admin"];
  const listing_id = midterm[req.params.listing_id];

  if (!adminID || adminID !== user_admin) {
    res
      .status(401)
      .send(
        `You must be logged in to edit your listings. Please try again. <a href="/login">Log Into Your Account </a>`
      );
    return;
  }

  midterm[req.params.listing_id] = req.body.EditField;
  res.redirect("/listings");
});
////---- EDITING LISTINGS END----////

////---- Favourite Listings start----///

router.get("/listings/:favourite", (req, res) => {
  const userID = req.session["user_id"];
  if (!userID) {
    res.redirect("/login");
  }

  const templateVars = {
    user: users[req.session["user_id"]],
    userID,
  };
  res.render("listings_favourite", templateVars);
});

router.post("/listings/:favourite") => {

const userID = req.session["user_id"];
if (!userID) {
  res.redirect("/login");
}

const templateVars = {
  user: users[req.session["user_id"]],
  userID,
};
res.render("listings_favourite", templateVars);
};
///----- Favourite Listings end ----////



////---- DELETE LISTINGS START ----////
router.post("/listings/:id/delete", (req, res) => {
  const adminID = req.session["user_admin"];
  const listing = midterm[req.params.listings_id];
  const idToDelete = req.params.listing_id;

  if (!adminID || adminID !== users_admin) {
    res
      .status(401)
      .send(
        `You must be logged in to delete listings you own. <a href="/login">Kindly log in to your account. </a>`
      );
  } else {
    delete midterm[idToDelete];
  }
  res.redirect("/listings");
});
////---- DELETE LISTINGS END ----////

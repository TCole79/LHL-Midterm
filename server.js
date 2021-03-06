// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const listingsRoutes = require("./routes/listings");
//const messagesRoutes = require("./routes/messages");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/listings", listingsRoutes(db));
//app.use("/api/messages", messagesRoutes(db));

//const widgetsRoutes = require("./routes/widgets");
// const listingRoutes = require("./routes/listings");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

// app.use("api/listings", listingsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/listings", (req, res) => {
  // fetch all listings // parse them as json // pass them to the template as templateVars
  db.query("SELECT * FROM listings")
    .then((data) => {
      const listings = data.rows;
      //const parsed = JSON.parse(listings);
      //JSON.parse(listings);
      res.render("listings", {listings});
    })
    .catch((err) => {
      console.log("Error message: ", err.message);
      res.status(500).json({ error: err.message });
    });
});

app.get("/messages", (req, res) => {
  // fetch all messages // parse them as json // pass them to the template as templateVars
  db.query("SELECT * FROM messages")
    .then((data) => {
      const messages = data.rows;
      res.render("messages", {messages});
    })
    .catch((err) => {
      console.log("Error message: ", err.message);
      res.status(500).json({ error: err.message });
    });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

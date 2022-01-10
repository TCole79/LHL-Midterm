// All routes for Listings are defined here

module.exports = function (router, database) {
  router.get("/listings", (req, res) => {
    database
      .getAllListings(req.query, 20)
      .then((listings) => res.send({ listings }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Do we need the below?
  // router.get("/reservations", (req, res) => {
  //   const userId = req.session.userId;
  //   if (!userId) {
  //     res.error("💩");
  //     return;
  //   }
  //   database
  //     .getAllReservations(userId)
  //     .then((reservations) => res.send({ reservations }))
  //     .catch((e) => {
  //       console.error(e);
  //       res.send(e);
  //     });
  // });

  router.post("/listings", (req, res) => {
    const userId = req.session.userId;
    database
      .addProperty({ ...req.body, user_id: userId })
      .then((property) => {
        res.send(property);
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};

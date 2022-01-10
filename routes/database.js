const listings = require('./json/listings.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'mt_database'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {

  return pool
    .query(`SELECT *
        FROM users
        WHERE email = $1;`, [email]
    )
    .then((res) => {

      if (!res.rows) {
        return null;
      } else {
        return res.rows[0];
      }
    });

};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`SELECT *
     FROM users
     WHERE  id = $1;`, [id])
    .then((res) => {
      console.log(res.rows[0]);
      if (!res.rows) {
        return null;
      } else {
        return res.rows[0];
      }
    });

};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */


const addUser =  function(user) {
  const query = {
    text: 'INSERT INTO users(name, email, password, phone_number) VALUES($1, $2, $3, $4)',
    values: [user.name, user.email, user.password, user.phone_number],
  };
  console.log(user);
  return pool
    .query(query.text, query.values)
    .then((res) => {
      return res.rows;
    });
};


exports.addUser = addUser;




/// Listings

/**
 * Get all listings.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllListings = function(options, limit = 10) {
  // 1
  const queryParams = [];
  //2
  let queryString = `
  SELECT listings.*,
  FROM listings
  `;
  //3

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    if (queryParams.length === 1) {
      queryString += `WHERE owner_id = $${queryParams.length}`;
    } else {
      queryString += `AND owner_id = $${queryParams.length}`;
    }
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push (options.minimum_price_per_night * 100, options.maximum_price_per_night *100);
    if (queryParams.length === 2) {
      queryString += `WHERE cost_per_night >= $${queryParams.length - 1} AND cost_per_night <= $${queryParams.length} `;
    } else {
      queryString += `AND cost_per_night >= $${queryParams.length - 1} AND cost_per_night <= $${queryParams.length} `;
    }
  }

  queryString += 'GROUP BY listing.id ';

  // if (options.minimum_rating) {
  //   queryParams.push(options.minimum_rating);
  //   queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
  // }
  //4
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  //5
  console.log(queryString, queryParams);
  //6
  return pool.query(queryString, queryParams)
    .then(res => res.rows);
};
exports.getAllListings = getAllListings;

/**
 * Add a property to the database
 * @param {{}} listing An object containing all of the listing details.
 * @return {Promise<{}>} A promise to the listing.
 */
const addListing = function(listings) {

  const params = [listings.owner_id, listings.title , listings.description , listings.thumbnail_photo_url , listings.cover_photo_url, listings.cost];

  return pool.query(`INSERT INTO properties(owner_id,
    title: string,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost,
    )

    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;`,params)

    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.addListing = addListing;

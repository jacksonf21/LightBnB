// const { Pool } = require('pg');
const db = require('./db/index');

// const pool = new Pool({
//   user: 'vagrant',
//   password: '123',
//   host: 'localhost',
//   database: 'lightbnb'
// });

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = email => {
  const queryStr = 'SELECT * FROM users WHERE email = $1';

  return db
    .query(queryStr, [email])
    .then(res => res.rows[0])
    .catch(err => null);
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = id => {
  const queryStr = 'SELECT * FROM users WHERE id = $1';

  return db
    .query(queryStr, [id])
    .then(res => res.rows[0])
    .catch(err => err);
};

exports.getUserWithId = getUserWithId;
/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

const addUser = user => {
  const queryStr = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3) RETURNING *
  `;
  const values = [user.name, user.email, user.password];

  return db
    .query(queryStr, values)
    .then(res => user)
    .catch(err => err);
};


exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

const getAllReservations = (guest_id, limit = 10) => {
  const queryStr = `
    SELECT reservations.*, properties.* 
    FROM reservations
    JOIN properties ON property_id = properties.id 
    WHERE guest_id = $1 
    LIMIT $2
  `;
  const values = [guest_id, limit];
  
  return db
    .query(queryStr, values)
    .then(res => res.rows)
    .catch(err => err);
};

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  const whereParam = ['WHERE '];

  let queryStr = `
    SELECT properties.*, avg(rating) AS average_rating 
    FROM properties
    JOIN property_reviews
    ON properties.id = property_id
    
  `;

  //FILTERS IF MULTIPLE FILTERS, NEED [MORE ANDS ON WHERE]
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    whereParam.push(`AND city LIKE $${queryParams.length}
    `);
  }

  if (options.id) {
    queryParams.push(options.id);
    whereParam.push(`AND id = $${queryParams.length}
    `);
  }

  //ADJUSTED FROM CENTS TO DEFAULT DOLLARS ON SEARCH
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryParams.push(options.maximum_price_per_night * 100);
    
    whereParam.push(`
      AND cost_per_night >= $${queryParams.length - 1}
    `);
    whereParam.push(`
      AND cost_per_night <= $${queryParams.length}
    `);

  }

  if (whereParam.length > 1) {
    whereParam[1] = whereParam[1].replace('AND', '');
    queryStr += whereParam.join(' ');
  }

  queryParams.push(limit);

  //IF MIN RATING SET CHECK
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryStr += `
      GROUP BY properties.id
      HAVING avg(rating) >= $${queryParams.length}
      ORDER BY cost_per_night
      LIMIT $${queryParams.length - 1};
    `;
  } else {
    queryStr += ` 
      GROUP BY properties.id
      ORDER BY cost_per_night
      LIMIT $${queryParams.length};
    `;
  }

  console.log(queryStr, queryParams);

  return db.query(queryStr, queryParams)
    .then(res => res.rows);
};

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

const addProperty = property => {
  const queryStr = `
    INSERT INTO properties (
      owner_id, 
      title, 
      description,
      thumbnail_photo_url, 
      cover_photo_url, 
      cost_per_night, 
      street, 
      city,province, 
      post_code, 
      country, 
      parking_spaces, 
      number_of_bathrooms, 
      number_of_bedrooms
    )
    
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *
  `;
  const values = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms
  ];

  return db
    .query(queryStr, values)
    .then(res => res)
    .catch(err => err);

};

exports.addProperty = addProperty;

const addReservation = reservation => {
  const queryStr = `
    INSERT INTO reservations
    (start_date, end_date, property_id, guest_id) 
    VALUES 
    ($1, $2, $3, $4) RETURNING *
  `;
  const values = [reservation.start_date, reservation.end_date, reservation.property_id, reservation.guest_id];

  return db
    .query(queryStr, values)
    .then(res => console.log(res))
    .catch(err => err);
  
};

exports.addReservation = addReservation;
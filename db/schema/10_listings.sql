DROP TABLE IF EXISTS listings CASCADE;
CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  listing_title VARCHAR(255) NOT NULL,
  listing_description TEXT NOT NULL,
  listing_status BOOLEAN NOT NULL DEFAULT true,
  listing_thumbnail_url VARCHAR (255),
  listing_photo_url VARCHAR (255),
  listing_date TIMESTAMP
);

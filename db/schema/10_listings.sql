DROP TABLE IF EXISTS listings CASCADE;
CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status BOOLEAN NOT NULL DEFAULT true,
  cost INTEGER NOT NULL,
  thumbnail_url VARCHAR (255),
  photo_url VARCHAR (255)
);

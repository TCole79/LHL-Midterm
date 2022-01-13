DROP TABLE IF EXISTS listings CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  receiver_id INTEGER REFERENCES users(id) NOT NULL,
  sender_id REFERENCES users(id) NOT NULL,
  message TEXT NOT NULL,
  date TIMESTAMP NOT NULL
);

DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
<<<<<<< HEAD
  receiver_id INTEGER REFERENCES users(id) NOT NULL,
=======
  receiver_email VARCHAR(255) NOT NULL,
>>>>>>> 12b22cf77f88cdc6cce8608dc74b86f595e38373
  sender_id INTEGER REFERENCES users(id) NOT NULL,
  message TEXT NOT NULL,
  date VARCHAR(255) NOT NULL
);

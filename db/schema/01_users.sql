-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  user_name VARCHAR (255) NOT NULL,
  user_email VARCHAR (255) NOT NULL,
  user_password VARCHAR (255) NOT NULL,
  user_cellphone VARCHAR (255) NOT NULL,
  user_admin BOOLEAN DEFAULT false
);

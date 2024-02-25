// Setup dotenv
import dotenv from "dotenv";
dotenv.config();

// Setup pg
import pg from "pg";
export const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create categories table
db.query(`CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  category TEXT
)`);

// Create posts table
db.query(`CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT,
  category_id INTEGER REFERENCES categories(id),
  likes INTEGER DEFAULT 0
)`);

// Insert categories data
db.query(`INSERT INTO categories (category)
VALUES
('Technology'),
('Music'),
('Science'),
('Food'),
('Movie');`);

// Insert posts data
db.query(`INSERT INTO posts (title, content, category_id)
VALUES
('Test Post 1', 'This post is about Technology', 1),
('Test Post 2', 'This post is about Music', 2);`);

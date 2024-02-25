// Setup express
import express from "express";
const app = express();
app.use(express.json());

// Setup cors
import cors from "cors";
app.use(cors());

// Setup dotenv
import dotenv from "dotenv";
dotenv.config();

// Setup pg
import pg from "pg";
export const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Setup port
const PORT = "8952";
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

/// Setup our root route
app.get("/", (req, res) => {
  res.send("Server is running");
  res.status(200);
});

// Get all posts or by category (/posts?category=Technology&category=Music)
app.get("/posts", async (req, res) => {
  try {
    let category = req.query.category;

    // Check for category paramater
    if (category) {
      category = [category];
      // Search for posts with given category
      const result = await db.query(
        `SELECT * FROM posts
        JOIN categories ON posts.category_id = categories.id
        WHERE categories.category = ANY($1)`,
        [category]
      );

      res.status(200).json(result.rows);
    }
    // Return all posts if no category paramater
    else {
      const result = await db.query("SELECT * FROM posts");
      res.status(200).json(result.rows);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new post
// req.body =
// {
// "title": "",
// "content": "",
// "category": ""
// }
app.post("/posts", async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // Check if all required fields are provided
    if (!title || !content || !category) {
      return res.status(400).json({ error: "Title, content, and category are required" });
    }

    // Insert the new post into the database
    await db.query(
      `INSERT INTO posts (title, content, category_id)
      VALUES ($1, $2, (SELECT id FROM categories WHERE category = $3))`,
      [title, content, category]
    );

    res.status(200).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Increase the number of likes (/posts/1/like)
app.put("/posts/:postID/like", async (req, res) => {
  try {
    const postID = req.params.postID;

    await db.query(
      `UPDATE posts
      SET likes = likes + 1
      WHERE id = $1`,
      [postID]
    );

    res.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a post (/posts/1)
app.delete("/posts/:postID", async (req, res) => {
  try {
    const postID = req.params.postID;

    await db.query(
      `DELETE FROM posts
      WHERE id = $1`,
      [postID]
    );

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

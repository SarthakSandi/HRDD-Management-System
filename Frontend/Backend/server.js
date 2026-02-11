const express = require("express");
const cors = require("cors");
const { sql, poolPromise } = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

/* CREATE USER (optional seeding) */
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  await sql.query`
    INSERT INTO Users (username, password)
    VALUES (${username}, ${password})
  `;

  res.send({ success: true });
});

/* LOGIN */
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const result = await sql.query`
    SELECT * FROM Users
    WHERE username=${username} AND password=${password}
  `;

  if (result.recordset.length > 0) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});
app.get("/events", async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT 
        id,
        title,
        event_date,
        event_time,
        category
      FROM Events
    `);

    res.send(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send([]);
  }
});
app.get("/events/upcoming", async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT *
      FROM Events
      WHERE event_date BETWEEN CAST(GETDATE() AS DATE)
      AND DATEADD(DAY, 7, CAST(GETDATE() AS DATE))
      ORDER BY event_date
    `);

    res.send(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send([]);
  }
});
/* UPDATE EVENT */
app.put("/events/:id", async (req, res) => {
  const { id } = req.params;
  const { title, date, time } = req.body;

  try {
    const pool = await poolPromise;

    await pool.request()
      .input("id", sql.Int, id)
      .input("title", sql.VarChar(200), title)
      .input("event_date", sql.Date, new Date(date))
      .input("event_time", sql.VarChar, time)
      .query(`
        UPDATE Events
        SET title = @title,
            event_date = @event_date,
            event_time = @event_time
        WHERE id = @id
      `);

    res.send({ success: true });
  } catch (err) {
    console.error("UPDATE EVENT ERROR:", err);
    res.status(500).send({ success: false });
  }
});
app.post("/events", async (req, res) => {
  const { title, date, time, category } = req.body;

  try {
    const pool = await poolPromise;

    await pool.request()
      .input("title", sql.VarChar(200), title)
      .input("event_date", sql.Date, new Date(date))
      .input("event_time", sql.VarChar, time)
      .input("category", sql.VarChar, category)
      .query(`
        INSERT INTO Events (title, event_date, event_time, category)
        VALUES (@title, @event_date, @event_time, @category)
      `);

    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false });
  }
});
app.delete("/events/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;

    await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Events WHERE id = @id");

    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false });
  }
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});

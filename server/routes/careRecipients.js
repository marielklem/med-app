const router = require("express").Router();
const { response } = require("express");
const db = require("../db");

router.post("/create", (req, res) => {
  const { name, birthDate } = req.body;

  db.query(
    "SELECT * FROM care_recipients WHERE date_of_birth = ?",
    [birthDate],
    (err, results) => {
      if (err) throw err;

      for (const item of results) {
        if (item.name === name) {
          res.status(400).json({ message: "User already exists" });
        }
      }
    }
  );
  db.query(
    "INSERT INTO care_recipients (name, date_of_birth) VALUES (?, ?)",
    [name, birthDate],
    (err, result) => {
      if (err) throw err;

      res.status(201).json({ id: result.insertId });
    }
  );
});

router.get("/", (req, res) => {
  const { userId } = req.params;

  const sql = `SELECT * FROM care_recipients WHERE id = ?`;

  db.query(sql, [userId], (err, results) => {
    res.status(201).json({ results });
  });

  db.query;
});

module.exports = router;

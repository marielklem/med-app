const router = require("express").Router();
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
          return res.status(200).json({ id: item.id, name: item.name }); //don't actually do this in real life- this is bad. There should be a seperate get
        } else {
          db.query(
            "INSERT INTO care_recipients (name, date_of_birth) VALUES (?, ?)",
            [name, birthDate],
            (err, result) => {
              if (err) {
                res.status(500).json({message: "An unknown error occurred"})
              }
              res.status(201).json({ id: result.insertId });
            }
          );
        }
      }
    }
  );
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `SELECT * FROM care_recipients WHERE id = ?`;

  db.query(sql, [userId], (err, results) => {
    res.status(201).json({ results });
  });

  db.query;
});

module.exports = router;

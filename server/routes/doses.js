const router = require("express").Router();
const db = require("../db");

router.patch("/:id/take", (req, res) => {
  const { id } = req.params;

  db.query(
    `
    UPDATE doses 
    SET taken = TRUE, taken_at = NOW()
    WHERE id = ?`,
    [id],
    (err, result) => {
      if (result) {
        res.status(200).json({ message: "Dose marked as taken" });
      } else {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  );
});

module.exports = router;

const router = require("express").Router();
const db = require("../db");
const dateUtil = require("../date-utils");

router.post("/create", (req, res) => {
  const { userId, medicationName, dosage, frequency, startDate, endDate, status } = req.body;

  const doseDates = dateUtil.getRecurringDates(startDate, endDate, frequency);

  const values = doseDates
    .map((date) => `(${medicationName}, ${date})`)
    .join(", ");

  console.log("VALUES-", values);
  res.status(200).json({ message: "Medication marked as inactive" });

  // try {
  //   const medication = db.query(
  //     "INSERT INTO medications (care_recipient_id, medication_name, dose_amount, recurrence_type, start_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
  //     [userId, medicationName, dosage, frequency, startDate, endDate, status],
  //     (err, results) => {
  //       if (err) throw err;
  //     }
  //   );

  //   const medicationId = medication[0].id;

  //   //if insert is successful then create doses
  //   //1- use start date to calucalte 30 doses.
  //   const doseDates = getRecurringDates(startDate, frequency);
  //   console.log(doseDates);

  //   const values = doseDates.map(date => `(${medicationId}, ${date})`).join(', ');

  //   console.log('VALUES-', values)

  //   //2-
  //   const doses = db.query(
  //     "INSERT INTO doses (medication_id, scheduled_datetime) VALUES (?, ?)",
  //     [values],
  //     (err, results) => {
  //       if (err) throw err;
  //     }
  //   );
  // } catch (err) {
  //   throw err;
  // }
});

router.get("/user/:userId", (req, res) => {
  const { userId } = req.params;

  const sql =
    "SELECT * FROM medication m JOIN doses d ON d.medication_id = m.id WHERE m.care_recipient_id = ? AND d.scheduled_datetime > NOW() AND m.is_active = TRUE ORDER BY d.scheduled_datetime ASC LIMIT 10";

  db.query(sql, [userId], (err, results) => {});
  res.status(201).json({ id: result.insertId });
});

//put needs to accept entire
router.patch("/:id/deactivate", (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE medications SET is_active = FALSE WHERE id = ?",
    [id],
    (err, results) => {}
  );
  res.status(200).json({ message: "Medication marked as inactive" });
});

module.exports = router;

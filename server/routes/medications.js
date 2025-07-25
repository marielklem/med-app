const router = require("express").Router();
const db = require("../db");
const dateUtil = require("../date-utils");

router.post("/create", (req, res) => {
  console.log(req.body);

  const { userId, medicationName, dosage, frequency, startDate, endDate } =
    req.body;

  let medicationId;

  try {
    db.query(
      "INSERT INTO medications (care_recipient_id, medication_name, dose_amount, recurrence_type, start_date, end_date) VALUE(?, ?, ?, ?, ?, ?)",
      [userId, medicationName, dosage, frequency, startDate, endDate],
      (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ message: "Something went wrong creating medication" });
        }

        if (result) {
          medicationId = result.insertId;

          //if insert is successful then create doses
          const doseDates = dateUtil.getRecurringDates(
            startDate,
            endDate,
            frequency
          );

          const values = doseDates
            .map((date) => `(${medicationId}, "${date}")`)
            .join(", ");

          const sql = `INSERT INTO doses (medication_id, schedule_date) VALUES ${values}`;

          db.query(sql, (err, result) => {
            if (err) {
              res
                .sendStatus(500)
                .json({ message: "Something went wrong creating doses" });
            }
            if (result) {
              res.status(201).json({
                message: "Medication successfully created",
                id: medicationId,
              });
            } else {
              res.status(500).send;
            }
          });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ message: "An error occurred" });
  }
});

//get medication by userId
router.get("/user/:userId", (req, res) => {
  const { userId } = req.params;

  const medSql = "SELECT * FROM medications WHERE care_recipient_id = ?";
  try {
    db.query(medSql, [userId], (err, medicationResults) => {
      if (medicationResults) {
        const medIds = medicationResults.map((med) => med.id).join(",");

        const doseSql = `SELECT d.schedule_date, d.taken, d.medication_id, d.id, d.taken_at FROM doses d WHERE d.medication_id IN (${medIds}) AND d.schedule_date > NOW() ORDER BY d.schedule_date ASC`;

        db.query(doseSql, (err, doseResults) => {
          if (err) {
            res.status(500).json({ message: "Something went wrong" });
          } else {
            const toDto = medicationResults.map((medication) => {
              const doses = doseResults.filter(
                (dose) => dose.medication_id === medication.id
              );
              return { ...medication, doses };
            });
            res.status(200).json(toDto);
          }
        });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//update active status
router.patch("/:id/deactivate", (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE medications SET is_active = FALSE WHERE id = ?",
    [id],
    (err, results) => {
      if (results) {
        res.status(200).json({ message: "Medication marked as inactive" });
      } else {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  );
});

module.exports = router;

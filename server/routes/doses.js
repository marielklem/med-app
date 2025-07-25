const router = require("express").Router();
const db = require('../db');

// exports.getUpcomingDoses = async (req, res) => {
//   const { care_recipient_id } = req.query;

//   const [doses] = await db.query(`
//     SELECT d.id, m.name AS medication_name, d.scheduled_datetime, d.taken
//     FROM medication_doses d
//     JOIN medication_schedules s ON d.schedule_id = s.id
//     JOIN medications m ON s.medication_id = m.id
//     WHERE m.care_recipient_id = ?
//       AND d.scheduled_datetime > NOW()
//       AND m.is_active = TRUE
//     ORDER BY d.scheduled_datetime ASC
//     LIMIT 50
//   `, [care_recipient_id]);

//   res.json(doses);
// };


router.put("/:id/take", (req, res) => {
  const { id } = req.params;

  db.query(`
    UPDATE medication_doses 
    SET taken = TRUE, taken_at = NOW()
    WHERE id = ?`, [id]);

  res.status(200).json({ message: 'Dose updated' });
});


module.exports = router;

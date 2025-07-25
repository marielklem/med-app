import React, { useState } from "react";
import axios from "axios";

const MedicationForm = () => {
  // const [recipient, setRecipient] = useState({ name: "", birthDate: "" });
  const [medication, setMedication] = useState({
    medicationName: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
  });


  const [recipientId, setRecipientId] = useState(null);
  const [message, setMessage] = useState("");

  // const handleRecipientSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("/recipients", {
  //       name: recipient.name,
  //       birthDate: recipient.birthDate,
  //     });
  //     setRecipientId(res.data.id);
  //     setMessage("Care recipient created successfully.");
  //   } catch (err) {
  //     console.error(err);
  //     setMessage("Error creating recipient.");
  //   }
  // };

  const handleMedicationSubmit = async (e) => {
    e.preventDefault();
    if (!recipientId) return setMessage("Create recipient first.");
    try {
      const res = await axios.post("/medications", {
        userId: recipientId,
        ...medication,
      });
      // const medId = res.data.id;

      setMessage("Medication and successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Error adding medication/schedule.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Medication Manager</h2>
{/* 
      <form onSubmit={handleRecipientSubmit} className="mb-4">
        <h5>1. Care Recipient</h5>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={recipient.name}
            onChange={(e) =>
              setRecipient({ ...recipient, name: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={recipient.birthDate}
            onChange={(e) =>
              setRecipient({ ...recipient, dob: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Recipient
        </button>
      </form> */}

      <form onSubmit={handleMedicationSubmit}>
        <h5>2. Medication Details</h5>
        <div className="mb-3">
          <label className="form-label">Medication Name</label>
          <input
            type="text"
            className="form-control"
            value={medication.medicationName}
            onChange={(e) =>
              setMedication({ ...medication, medicationName: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dose Amount</label>
          <input
            type="text"
            className="form-control"
            value={medication.dosage}
            onChange={(e) =>
              setMedication({ ...medication, dosage: e.target.value })
            }
          />
        </div>
        
        <h5 className="mt-4">3. Medication Schedule</h5>
        <div className="mb-3">
          <label className="form-label">Frequency</label>
          <select
            className="form-select"
            value={medication.frequency}
            onChange={(e) =>
              setMedication({ ...medication, frequency: e.target.value })
            }
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        {/* {medication.recurrence_type === "weekly" && (
          <div className="mb-3">
            <label className="form-label">Day of Week</label>
            <select
              className="form-select"
              value={schedule.day_of_week}
              onChange={(e) =>
                setSchedule({ ...schedule, day_of_week: e.target.value })
              }
              required
            >
              <option value="">Select</option>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        )} */}

        {/* <div className="mb-3">
          <label className="form-label">Time of Day</label>
          <input
            type="time"
            className="form-control"
            value={schedule.time_of_day}
            onChange={(e) =>
              setSchedule({ ...schedule, time_of_day: e.target.value })
            }
            required
          />
        </div> */}
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={medication.startDate}
            onChange={(e) =>
              setMedication({ ...medication, startDate: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date (Optional)</label>
          <input
            type="date"
            className="form-control"
            value={medication.endDate}
            onChange={(e) =>
              setMedication({ ...medication, endDate: e.target.value })
            }
          />
        </div>

        <button type="submit" className="btn btn-success">
          Save Medication & Schedule
        </button>
      </form>

      {message && <div className="alert alert-info mt-4">{message}</div>}
    </div>
  );
};

export default MedicationForm;

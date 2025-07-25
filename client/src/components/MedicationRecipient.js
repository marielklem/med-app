import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCareRecipient } from "../service/recipient";
import { getMedicationsByUser } from "../service/medication";

const MedicationRecipient = () => {
  const navigate = useNavigate();

  const [recipient, setRecipient] = useState({ name: "", birthDate: "" });
  const [recipientId, setRecipientId] = useState(null);
  const [message, setMessage] = useState("");

  const handleRecipientSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createCareRecipient(recipient);
      if (res) {
        navigate("/create")
      }
      setRecipientId(res.data.id);
      navigate("/create"); 
    } catch (err) {
      console.error(err);
      setMessage("Error creating recipient.");
    }
  };

  const fetchMedicationSchedules = async () => {
    try {
      const res = await getMedicationsByUser(recipient);
      setRecipientId(res.data.id);
      setMessage("Care recipient created successfully.");
      navigate("/schedule"); //TODO: Send userID somehow to this component.
    } catch (err) {
      console.error(err);
      setMessage("Error creating recipient.");
    }
  };

  return (
    <div className="container mt-5">
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
        <div>
            <button type="submit" className="btn btn-primary w-50">
            Create New Recipient
          </button>
          <button
            type="submit"
            className="btn btn-info w-50"
            onClick={fetchMedicationSchedules}
          >
            Get Medications
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicationRecipient;

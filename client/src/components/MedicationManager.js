import React, { useState } from "react";
import { createCareRecipient } from "../service/recipient";
import MedicationForm from "./medicationForm";
import MedicationSchedule from "./medicationSchedule";
import { getMedicationsByUser, createMedication } from "../service/medication";

const MedicationManager = () => {
  const [view, setView] = useState("recipient");
  const [recipient, setRecipient] = useState({ name: "", birthDate: "" });
  const [medication, setMedication] = useState({
    medicationName: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
  });

  const [recipientId, setRecipientId] = useState(null);
  const [showClear, setShowClear] = useState(false);

  const [message, setMessage] = useState("");

  const isValidUser = () =>
    recipient.name.length > 0 && recipient.birthDate.length > 0;

  const handleRecipientSubmit = async (e) => {
    e.preventDefault();
    setShowClear(true);
    try {
      const res = await createCareRecipient(recipient);
      if (res) {
        setRecipientId(res.data.id);
        if (res.data.name) {
          setView("doses");
        } else {
          setView("medication");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("Error creating recipient."); //should we check here and if it exists just show meds?
    }
  };

  const handleMedicationSubmit = async (e) => {
    e.preventDefault();

    if (!recipientId) return setMessage("Create recipient first.");
    setShowClear(true);
    try {
      const response = await createMedication(medication, recipientId);

      if (response.status === 201) {
        setMessage("Medication successfully added.");
        setView("doses");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error adding medication/schedule.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Medication Manager</h2>
      <form onSubmit={handleRecipientSubmit} className="mb-4">
        <h5>Care Recipient</h5>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            disabled={showClear}
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
            disabled={showClear}
            value={recipient.birthDate}
            onChange={(e) =>
              setRecipient({ ...recipient, birthDate: e.target.value })
            }
            required
          />
        </div>

        {showClear ? (
          <div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={() => {
                setRecipient({ name: "", birthDate: "" });
                setShowClear(false);
                setView("recipient");
              }}
            >
              Clear User
            </button>
          </div>
        ) : (
          <div>
            <button
              type="submit"
              className="btn btn-primary w-50"
              disabled={!isValidUser()}
              onClick={handleRecipientSubmit}
            >
              Create New Recipient
            </button>
            <button
              type="submit"
              className="btn btn-info w-50"
              disabled={!isValidUser()}
              onClick={() => setView('doses')}
            >
              Get Medications
            </button>
          </div>
        )}
      </form>

      {view === "medication" && (
        <div>
          <MedicationForm
            recipientId={recipientId}
            medication={medication}
            setMedication={setMedication}
            onSubmit={handleMedicationSubmit}
            message={message}
          />
          <button
            className="mt-5 btn btn-primary w-100"
            onClick={() => setView("doses")}
          >
            View Medications
          </button>
        </div>
      )}

      {view === "doses" && (
        <>
          <MedicationSchedule recipientId={recipientId} />
          <button
            className="mt-5 btn btn-primary w-100"
            onClick={() => setView("medication")}
          >
            Create New Medication
          </button>
        </>
      )}
    </div>
  );
};

export default MedicationManager;

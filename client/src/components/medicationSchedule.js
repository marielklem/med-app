import React, { useState, useEffect } from "react";
import axios from "axios";
import { getMedicationsByUser } from "../service/medication";

const MedicationSchedule = ({ recipientId }) => {
  const [medications, setMedications] = useState([]);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!recipientId) return;

    const url = `/medications/user/${recipientId}`;

    axios
      .get(url)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setMedications(res.data);
        }
      })
      .catch((err) => err);
  }, [recipientId, refresh]);

  const handleSetInactive = async (medId) => {
    try {
      await axios.patch(`/medications/${medId}/deactivate`).then((res) => {
        setRefresh(!refresh); // refresh list
      });
    } catch (err) {
      console.error(err);
      setError("Could not deactivate medication.");
    }
  };

  const makeDoseAsTaken = async (event) => {
    console.log(event.target);
    try {
      await axios.patch(`/doses/${event.target.id}/take`).then((res) => {
        setRefresh(!refresh); // refresh list
      });
    } catch (err) {
      console.error(err);
      setError("Could not make dose as taken.");
    }
  };

  if (!recipientId) return <p>Please select a care recipient.</p>;

  return (
    <div className="mt-4">
      <h4>All Medications</h4>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="accordion" id="medicationAccordion">
        {medications.length === 0 ? (
          <p className="text-muted">No medications found.</p>
        ) : (
          medications.map((medication, index) => (
            <div className="accordion-item" key={medication.id}>
              {console.log(medication)}
              <h2 className="accordion-header" id={`heading-${medication.id}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${medication.id}`}
                  aria-expanded="false"
                  aria-controls={`collapse-${medication.id}`}
                >
                  <div className="d-flex justify-content-between w-100">
                    <span>
                      <strong>{medication.medication_name}</strong> —{" "}
                      {medication.dose_amount || "No dosage"}
                      {!medication.is_active && (
                        <span className="badge bg-secondary ms-2">
                          Inactive
                        </span>
                      )}
                    </span>
                    {medication.is_active && (
                      <span
                        className="text-danger ms-3"
                        role="button"
                        title="Mark as inactive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetInactive(medication.id);
                        }}
                      >
                        🗑️
                      </span>
                    )}
                  </div>
                </button>
              </h2>
              <div
                id={`collapse-${medication.id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading-${medication.id}`}
                data-bs-parent="#medicationAccordion"
              >
                <div className="accordion-body">
                  <p>
                    <strong>Frequency:</strong>{" "}
                    {medication.recurrence_type || "N/A"}
                  </p>
                  <p>
                    <strong>Medication Start Date:</strong>{" "}
                    {new Date(medication.start_date).toDateString() || "N/A"}
                  </p>

                  <p>
                    <strong>Doses:</strong>
                  </p>
                  {medication.doses?.length > 0 ? (
                    <ul className="list-group">
                      {medication.doses.map((dose) => (
                        <li
                          key={dose.id}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          {new Date(dose.schedule_date).toDateString()}

                          <span>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id={dose.id}
                                checked={dose.taken}
                                onChange={makeDoseAsTaken}
                              />
                              <label>{dose.taken ? (new Date(dose.taken_at).toLocaleString()) : "Mark as taken"}</label>
                            </div>
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No doses scheduled.</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MedicationSchedule;

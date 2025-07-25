const MedicationForm = ({
  medication,
  setMedication,
  onSubmit,
  message,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <h4>Create New Medication</h4>
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
        Save Medication
      </button>

      {message && <div className="alert alert-info mt-4">{message}</div>}
    </form>
  );
};

export default MedicationForm;

import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

export const createMedication = async (medication, recipientId) => {
  const url = "/medications/create";
  const body = {
    medicationName: medication.medicationName,
    dosage: medication.dosage,
    frequency: medication.frequency,
    startDate: medication.startDate,
    endDate: medication.endDate,
    userId: recipientId,
  };

  return await axios
    .post(url, body)
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};

export const getMedicationsByUser = async (userId) => {
  console.log(userId)
  const url = `/medications/user/${userId}`;

  return await axios
    .get(url)
    .then((res) => {
      console.log(res.data)
      return res;
    })
    .catch((err) => err);
};

export const markMedicationAsInactive = async (id) => {
  const url = `/medications/${id}/deactivate`;

  return await axios
    .patch(url)
    .then((res) => res)
    .catch((err) => err);
};

export const markDoseAsTaken = async (id) => {
  const url = `/doses/${id}/taken`;

  return await axios
    .patch(url)
    .then((res) => res)
    .catch((err) => err);
};
